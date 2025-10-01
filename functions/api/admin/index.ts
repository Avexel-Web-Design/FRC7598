import { Hono } from 'hono';
import { verify } from 'hono/jwt';

type Env = { DB: any; JWT_SECRET: string };
type JwtUser = { id: number; name: string; isAdmin: boolean };

const admin = new Hono<{ Bindings: Env }>();

async function getAuthUser(c: any): Promise<JwtUser | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded = await verify(token, c.env.JWT_SECRET);
    // decoded is any; normalize
    return {
      id: Number((decoded as any).id),
      name: String((decoded as any).name || ''),
      isAdmin: !!(decoded as any).isAdmin,
    };
  } catch {
    return null;
  }
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// List users (admin only)
admin.get('/users', async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin) return c.json({ error: 'Forbidden' }, 403);
  try {
    const { results } = await c.env.DB
      .prepare('SELECT id, full_name as username, is_admin, created_at, avatar_color FROM users ORDER BY full_name ASC')
      .all();
    return c.json(results);
  } catch (e) {
    console.error('Failed to load users', e);
    return c.json({ error: 'Failed to load users' }, 500);
  }
});

// Update user (admin only)
admin.put('/users/:userId', async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin) return c.json({ error: 'Forbidden' }, 403);
  const userId = Number(c.req.param('userId'));
  if (!Number.isFinite(userId)) return c.json({ error: 'Invalid user id' }, 400);

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  // Prevent changing your own admin status
  if (userId === au.id && typeof body.is_admin !== 'undefined') {
    return c.json({ error: 'Cannot modify your own admin status' }, 400);
  }

  const updates: string[] = [];
  const values: any[] = [];

  // Admin flag
  if (typeof body.is_admin !== 'undefined') {
    updates.push('is_admin = ?');
    values.push(body.is_admin ? 1 : 0);
  }

  // Username/full name change - accept either field name
  const newName: string | undefined = (body.fullName ?? body.username)?.toString()?.trim();
  if (newName) {
    // Ensure unique name (excluding target user)
    const existing = await c.env.DB
      .prepare('SELECT id FROM users WHERE full_name = ? AND id != ?')
      .bind(newName, userId)
      .first();
    if (existing) return c.json({ error: 'User already exists' }, 409);
    updates.push('full_name = ?');
    values.push(newName);
  }

  // Password change
  const newPassword: string | undefined = body.password?.toString()?.trim();
  if (newPassword) {
    if (newPassword.length < 6) return c.json({ error: 'Password must be at least 6 characters' }, 400);
    const hash = await sha256(newPassword);
    updates.push('password_hash = ?');
    values.push(hash);
  }

  if (updates.length === 0) return c.json({ error: 'No valid fields to update' }, 400);

  values.push(userId);
  try {
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await c.env.DB.prepare(sql).bind(...values).run();
    return c.json({ success: true });
  } catch (e) {
    console.error('Failed to update user', e);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Delete user (admin only)
admin.delete('/users/:userId', async (c) => {
  const au = await getAuthUser(c);
  if (!au || !au.isAdmin) return c.json({ error: 'Forbidden' }, 403);
  const userId = Number(c.req.param('userId'));
  if (!Number.isFinite(userId)) return c.json({ error: 'Invalid user id' }, 400);
  if (userId === au.id) return c.json({ error: 'Cannot delete your own account' }, 400);
  try {
    await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    return c.json({ success: true });
  } catch (e) {
    console.error('Failed to delete user', e);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

export default admin;
