import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import login from './auth/login';
import register from './auth/register';
import { corsMiddleware, errorMiddleware } from './middleware';

const app = new Hono().basePath('/api');

// global middleware
app.use('*', corsMiddleware);
app.use('*', errorMiddleware);

app.route('/auth/login', login);
app.route('/auth/register', register);

app.get('/health', (c) => c.json({ ok: true, env: 'pages', time: new Date().toISOString() }));

app.get('/', (c) => c.json({
  message: 'FRC7598 API',
  endpoints: ['/api/health', '/api/auth/login', '/api/auth/register']
}));

export const onRequest = handle(app);
