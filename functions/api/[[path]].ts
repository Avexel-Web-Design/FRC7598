import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import login from './auth/login';
import register from './auth/register';
import { corsMiddleware, errorMiddleware } from './middleware';
import chat from './chat';
import admin from './admin';
import calendar from './calendar';
import tasks from './tasks';
import profile from './profile';
import devices from './devices';
import uploads from './uploads';
import push from './push';

const app = new Hono().basePath('/api');

// global middleware
app.use('*', corsMiddleware);
app.use('*', errorMiddleware);

app.route('/auth/login', login);
app.route('/auth/register', register);
app.route('/chat', chat);
app.route('/admin', admin);
app.route('/calendar', calendar);
app.route('/tasks', tasks);
app.route('/profile', profile);
app.route('/devices', devices);
app.route('/uploads', uploads);
app.route('/push', push);

app.get('/health', (c) => c.json({ ok: true, env: 'pages', time: new Date().toISOString() }));

app.get('/', (c) => c.json({
  message: 'FRC7598 API',
  endpoints: ['/api/health', '/api/auth/login', '/api/auth/register']
}));

export const onRequest = handle(app);
