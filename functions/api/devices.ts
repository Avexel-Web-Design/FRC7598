import { Hono } from 'hono';
import { verify } from 'hono/jwt';

type Env = {
  DB: D1Database;
  JWT_SECRET: string;
};

const devices = new Hono<{ Bindings: Env }>();

async function getAuthUserId(c: any): Promise<number | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded: any = await verify(token, c.env.JWT_SECRET);
    return Number(decoded.id);
  } catch {
    return null;
  }
}

// Register or update a device token for the authenticated user
devices.post('/', async (c) => {
  try {
    const userId = await getAuthUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);
    const body = await c.req.json<{ token: string; platform?: string }>();
    const token = (body.token || '').trim();
    const platform = (body.platform || 'android').toLowerCase();
    if (!token) return c.json({ error: 'token is required' }, 400);
    await c.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS device_tokens (
        user_id INTEGER NOT NULL,
        token TEXT PRIMARY KEY,
        platform TEXT,
        updated_at TEXT
      );
    `).run();
    const now = new Date().toISOString();
    await c.env.DB.prepare(`
      INSERT INTO device_tokens (user_id, token, platform, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(token) DO UPDATE SET user_id = excluded.user_id, platform = excluded.platform, updated_at = excluded.updated_at
    `).bind(userId, token, platform, now).run();
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ error: 'Failed to save device token' }, 500);
  }
});

// Remove a device token for the authenticated user (best-effort)
devices.delete('/', async (c) => {
  try {
    const userId = await getAuthUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);
    const body = await c.req.json<{ token: string }>();
    const token = (body.token || '').trim();
    if (!token) return c.json({ error: 'token is required' }, 400);
    await c.env.DB.prepare('DELETE FROM device_tokens WHERE token = ? AND user_id = ?').bind(token, userId).run();
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ error: 'Failed to remove device token' }, 500);
  }
});

// List device tokens for the authenticated user
devices.get('/', async (c) => {
  try {
    const userId = await getAuthUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);
    const { results } = await c.env.DB.prepare('SELECT token, platform, updated_at FROM device_tokens WHERE user_id = ? ORDER BY updated_at DESC')
      .bind(userId).all();
    return c.json({ ok: true, tokens: results || [] });
  } catch (e) {
    return c.json({ error: 'Failed to list device tokens' }, 500);
  }
});

export default devices;
