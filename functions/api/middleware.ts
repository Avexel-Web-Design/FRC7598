import { createMiddleware } from 'hono/factory';
import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
});

export const errorMiddleware = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (e) {
    console.error('API error:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});
