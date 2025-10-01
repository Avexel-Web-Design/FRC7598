import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

interface Env {
  DB: any;
  JWT_SECRET: string;
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const app = new Hono<{ Bindings: Env }>();

// Public registration (non-admin). To create admin users, the requester must be admin and send is_admin=true
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const fullName = body.fullName as string;
    const password = body.password as string;
    const is_admin = body.is_admin as boolean | undefined;

    if (!fullName || !password) {
      return c.json({ error: 'Full name and password are required' }, 400);
    }

    // If admin flag requested, verify requester token is admin
    let isAdminValue = 0;
    if (is_admin === true) {
      const auth = c.req.header('Authorization');
      if (!auth?.startsWith('Bearer ')) return c.json({ error: 'Only admins can create admin users' }, 403);
      try {
        const token = auth.split(' ')[1];
        const decoded = await verify(token, c.env.JWT_SECRET);
        if (!(decoded.isAdmin === true || decoded.isAdmin === 1)) {
          return c.json({ error: 'Only admins can create admin users' }, 403);
        }
        isAdminValue = 1;
      } catch {
        return c.json({ error: 'Invalid authorization' }, 401);
      }
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }

    const password_hash = await sha256(password);

    const { success, meta } = await c.env.DB.prepare(
      'INSERT INTO users (full_name, password_hash, is_admin) VALUES (?, ?, ?)'
    ).bind(fullName, password_hash, isAdminValue).run();

    if (!success) return c.json({ error: 'Failed to register' }, 500);

    const token = await sign({
      id: meta.last_row_id,
      name: fullName,
      isAdmin: !!isAdminValue,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    }, c.env.JWT_SECRET);

    return c.json({
      token,
      user: { id: meta.last_row_id, name: fullName, isAdmin: !!isAdminValue },
      message: 'Registration successful'
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes('UNIQUE')) {
      return c.json({ error: 'User already exists' }, 409);
    }
    console.error('register error', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
