import { Hono } from 'hono';
import { sign } from 'hono/jwt';

interface Env {
  // Using any to avoid requiring CF types in app-level tsconfig
  DB: any;
  JWT_SECRET: string;
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const app = new Hono<{ Bindings: Env }>();

// Login with full name and password
app.post('/', async (c) => {
  try {
    const { fullName, password } = await c.req.json();
    if (!fullName || !password) {
      return c.json({ error: 'Full name and password are required' }, 400);
    }

    const user = await c.env.DB.prepare('SELECT id, full_name, password_hash, is_admin FROM users WHERE full_name = ?')
      .bind(fullName)
      .first();

    if (!user) return c.json({ error: 'Invalid credentials' }, 401);

    const hashed = await sha256(password);
    if (hashed !== user.password_hash) return c.json({ error: 'Invalid credentials' }, 401);

    const token = await sign({
      id: user.id,
      name: user.full_name,
      isAdmin: !!user.is_admin,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    }, c.env.JWT_SECRET);

    return c.json({
      token,
      user: { id: user.id, name: user.full_name, isAdmin: !!user.is_admin },
      message: 'Login successful',
    });
  } catch (e) {
    console.error('login error', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
