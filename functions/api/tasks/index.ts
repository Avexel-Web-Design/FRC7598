import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { sendPushToUsers } from '../utils/push';

type Env = { DB: any; JWT_SECRET: string };
type JwtUser = { id: number; name: string; isAdmin: boolean };

const tasks = new Hono<{ Bindings: Env }>();

async function getAuthUser(c: any): Promise<JwtUser | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded: any = await verify(token, c.env.JWT_SECRET);
    return { id: Number(decoded.id), name: String(decoded.name || ''), isAdmin: !!decoded.isAdmin };
  } catch {
    return null;
  }
}

// List tasks
tasks.get('/', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    const { results } = await c.env.DB.prepare(`
      SELECT t.*, 
             u1.full_name as creator_username,
             u2.full_name as assignee_username
      FROM tasks t 
      LEFT JOIN users u1 ON t.created_by = u1.id
      LEFT JOIN users u2 ON t.assigned_to = u2.id
      ORDER BY COALESCE(t.due_date, '9999-12-31') ASC, t.created_at DESC
    `).all();
    return c.json(results);
  } catch (e) {
    console.error('Error fetching tasks', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create task
tasks.post('/', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const { title, description, assigned_to, due_date, priority } = await c.req.json();
    if (!title) return c.json({ error: 'Title is required' }, 400);
    if (due_date && !/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
      return c.json({ error: 'Invalid due date format. Use YYYY-MM-DD' }, 400);
    }
    const validPriorities = ['low', 'medium', 'high'];
    const p = validPriorities.includes(priority) ? priority : 'medium';
    const { success } = await c.env.DB.prepare(
      'INSERT INTO tasks (title, description, assigned_to, created_by, due_date, priority) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(title, description || null, assigned_to || null, user.id, due_date || null, p).run();
    if (success) {
      // Push notify assignee if present
      try {
        if (assigned_to) {
          // Fetch creator name for nicer title
          let creatorName = user.name || `User ${user.id}`;
          try {
            const r = await c.env.DB.prepare('SELECT full_name FROM users WHERE id = ?').bind(user.id).first();
            creatorName = (r as any)?.full_name || creatorName;
          } catch {}
          const pr = (p as string).toUpperCase();
          const due = due_date ? new Date(due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date';
          const body = `${pr} • Due ${due} — ${String(title).slice(0, 120)}`;
          await sendPushToUsers(c, [Number(assigned_to)], `Task assigned by ${creatorName}`, body, { route: '/planner?filter=assigned' });
        }
      } catch {}
      return c.json({ message: 'Task created successfully' });
    }
    return c.json({ error: 'Failed to create task' }, 500);
  } catch (e) {
    console.error('Error creating task', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update task
tasks.put('/:id', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    const { id } = c.req.param();
  const { title, description, completed, assigned_to, due_date, priority } = await c.req.json();
    if (!title) return c.json({ error: 'Title is required' }, 400);
    if (due_date && !/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
      return c.json({ error: 'Invalid due date format. Use YYYY-MM-DD' }, 400);
    }
    const validPriorities = ['low', 'medium', 'high'];
    const p = validPriorities.includes(priority) ? priority : 'medium';
    // Get previous assignment to detect changes
  const prevRow = await c.env.DB.prepare('SELECT assigned_to, title, priority, due_date FROM tasks WHERE id = ?').bind(id).first();
    const prevAssigned: number | null = prevRow ? Number((prevRow as any).assigned_to ?? null) : null;

    const { success } = await c.env.DB.prepare(
      'UPDATE tasks SET title = ?, description = ?, completed = ?, assigned_to = ?, due_date = ?, priority = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(title, description || null, completed ? 1 : 0, assigned_to || null, due_date || null, p, id).run();
    if (success) {
      // If assignment changed (including from null), notify the new assignee
      try {
        const newAssigned = assigned_to ? Number(assigned_to) : null;
        if (newAssigned && newAssigned !== prevAssigned) {
          let updaterName = user.name || `User ${user.id}`;
          try {
            const r = await c.env.DB.prepare('SELECT full_name FROM users WHERE id = ?').bind(user.id).first();
            updaterName = (r as any)?.full_name || updaterName;
          } catch {}
          const pr = (p as string).toUpperCase();
          const due = (due_date || (prevRow as any)?.due_date) ? new Date(due_date || (prevRow as any)?.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date';
          const tTitle = title || (prevRow as any)?.title || 'Task Updated';
          const body = `${pr} • Due ${due} — ${String(tTitle).slice(0, 120)}`;
          await sendPushToUsers(c, [newAssigned], `Task assigned by ${updaterName}`, body, { route: '/planner?filter=assigned' });
        }
      } catch {}
      return c.json({ message: 'Task updated successfully' });
    }
    return c.json({ error: 'Failed to update task' }, 500);
  } catch (e) {
    console.error('Error updating task', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Lightweight counts endpoint for notification badges
tasks.get('/counts', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    const row = await c.env.DB.prepare('SELECT COUNT(*) as cnt FROM tasks WHERE assigned_to = ? AND completed = 0').bind(user.id).first();
    const assignedPending = Number((row as any)?.cnt || 0);
    return c.json({ assignedPending });
  } catch (e) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Toggle completion
tasks.patch('/:id/complete', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    const { id } = c.req.param();
    const { completed } = await c.req.json();
    if (typeof completed !== 'boolean') return c.json({ error: 'Invalid completed status' }, 400);
    const { success } = await c.env.DB.prepare(
      'UPDATE tasks SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(completed ? 1 : 0, id).run();
    if (success) return c.json({ message: 'Task completion status updated' });
    return c.json({ error: 'Failed to update task' }, 500);
  } catch (e) {
    console.error('Error updating completion', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete task
tasks.delete('/:id', async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    const { id } = c.req.param();
    const { success } = await c.env.DB.prepare('DELETE FROM tasks WHERE id = ?').bind(id).run();
    if (success) return c.json({ message: 'Task deleted successfully' });
    return c.json({ error: 'Failed to delete task' }, 500);
  } catch (e) {
    console.error('Error deleting task', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default tasks;
