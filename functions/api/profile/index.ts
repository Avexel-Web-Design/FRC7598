import { Hono } from 'hono';
import { verify } from 'hono/jwt';

type Env = { DB: any; JWT_SECRET: string };
type JwtUser = { id: number; name: string; isAdmin: boolean };

const profile = new Hono<{ Bindings: Env }>();

async function getAuthUser(c: any): Promise<JwtUser | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded = await verify(token, c.env.JWT_SECRET);
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

// Get current user profile
profile.get('/', async (c) => {
  const au = await getAuthUser(c);
  if (!au) return c.json({ error: 'Unauthorized' }, 401);
  try {
    const row = await c.env.DB
      .prepare('SELECT id, full_name, is_admin, created_at, avatar_color FROM users WHERE id = ?')
      .bind(au.id)
      .first();
    if (!row) return c.json({ error: 'User not found' }, 404);
    return c.json({
      id: row.id,
      username: row.full_name,
      is_admin: !!row.is_admin,
      created_at: row.created_at,
      avatar_color: row.avatar_color ?? null,
    });
  } catch (e) {
    console.error('profile get error', e);
    return c.json({ error: 'Failed to load profile' }, 500);
  }
});

// Update username, avatar color, or password
profile.put('/', async (c) => {
  const au = await getAuthUser(c);
  if (!au) return c.json({ error: 'Unauthorized' }, 401);
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  // Password update
  if (typeof body.password === 'string') {
    const pw = body.password.trim();
    if (pw.length < 6) return c.json({ error: 'Password must be at least 6 characters long' }, 400);
    try {
      const hash = await sha256(pw);
      await c.env.DB
        .prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        .bind(hash, au.id)
        .run();
      return c.json({ message: 'Password updated successfully' });
    } catch (e) {
      console.error('profile password update error', e);
      return c.json({ error: 'Failed to update password' }, 500);
    }
  }

  // Avatar color update
  if (Object.prototype.hasOwnProperty.call(body, 'avatar_color')) {
    try {
      await c.env.DB
        .prepare('UPDATE users SET avatar_color = ? WHERE id = ?')
        .bind(body.avatar_color ?? null, au.id)
        .run();
      return c.json({ message: 'Avatar color updated successfully' });
    } catch (e) {
      console.error('profile avatar update error', e);
      return c.json({ error: 'Failed to update avatar color' }, 500);
    }
  }

  // Username update
  if (typeof body.username === 'string') {
    const newName = body.username.trim();
    if (newName.length < 3) return c.json({ error: 'Username must be at least 3 characters long' }, 400);
    try {
      const exists = await c.env.DB
        .prepare('SELECT id FROM users WHERE LOWER(full_name) = LOWER(?) AND id != ?')
        .bind(newName, au.id)
        .first();
      if (exists) return c.json({ error: 'Username already taken' }, 409);
      await c.env.DB
        .prepare('UPDATE users SET full_name = ? WHERE id = ?')
        .bind(newName, au.id)
        .run();
      return c.json({ message: 'Profile updated successfully' });
    } catch (e) {
      console.error('profile username update error', e);
      return c.json({ error: 'Failed to update profile' }, 500);
    }
  }

  return c.json({ error: 'No valid fields to update' }, 400);
});

// Change password with current password verification
profile.post('/change-password', async (c) => {
  const au = await getAuthUser(c);
  if (!au) return c.json({ error: 'Unauthorized' }, 401);
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
  const { currentPassword, newPassword, confirmPassword } = body || {};
  if (!currentPassword || !newPassword || !confirmPassword) return c.json({ error: 'All password fields are required' }, 400);
  if (newPassword !== confirmPassword) return c.json({ error: 'New passwords do not match' }, 400);
  if (String(newPassword).trim().length < 6) return c.json({ error: 'New password must be at least 6 characters long' }, 400);

  try {
    const row = await c.env.DB
      .prepare('SELECT password_hash FROM users WHERE id = ?')
      .bind(au.id)
      .first();
    if (!row) return c.json({ error: 'User not found' }, 404);
    const currentHash = await sha256(String(currentPassword));
    if (currentHash !== row.password_hash) return c.json({ error: 'Current password is incorrect' }, 401);
    const newHash = await sha256(String(newPassword));
    await c.env.DB
      .prepare('UPDATE users SET password_hash = ? WHERE id = ?')
      .bind(newHash, au.id)
      .run();
    return c.json({ message: 'Password changed successfully' });
  } catch (e) {
    console.error('profile change-password error', e);
    return c.json({ error: 'Failed to change password' }, 500);
  }
});

export default profile;
