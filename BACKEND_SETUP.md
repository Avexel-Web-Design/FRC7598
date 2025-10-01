Backend and Login Setup (Cloudflare Pages + D1 + Hono)

This project now includes a serverless backend for authentication (full name + password) using Cloudflare Pages Functions, Hono, and a Cloudflare D1 database.

What you get
- API routes:
  - POST /api/auth/register { fullName, password, is_admin? }
  - POST /api/auth/login { fullName, password }
  - GET  /api/health
- Frontend login page at /login and a simple session stored in localStorage.

Prerequisites
- Cloudflare account with Pages enabled
- Wrangler CLI (local dev)
  - npm i -D wrangler
- Node 18+

One-time Cloudflare setup
1) Create a Pages project pointing at this repo
2) Create a D1 database in the Cloudflare dashboard
   - Note the Database ID
3) Bind D1 and add env var in Pages project settings
   - D1 binding name: DB
   - Add environment variable: JWT_SECRET = a-long-random-secret
4) Apply SQL migrations to your D1 database (can be done via Wrangler locally or Dashboard SQL)
   - migrations/001_init.sql

Local development (simulate Pages Functions)
1) Build the frontend to dist:
   npm run build
2) Start Pages dev with Functions:
   npm run dev:pages
3) Visit http://127.0.0.1:8788 (default) and test /api/health

Creating users
- Register a new user (non-admin):
  POST /api/auth/register { fullName, password }
- To create an admin user, call the same endpoint with is_admin: true from an account that is already admin (include its Bearer token).
- Passwords are hashed with SHA-256 (no salt) suitable for simple internal usage. For production, consider upgrading to a stronger KDF.

Seeding a user quickly
Run this SQL in D1 (Dashboard > D1 > Console or via wrangler d1 execute):
  INSERT INTO users (full_name, password_hash, is_admin) VALUES (
    'Jane Doe',
    '8d969eef6ecad3c29a3a629280e686cff8fabd... (sha256 of "123456")',
    0
  );
Note: Compute SHA-256 of your password and paste it into password_hash, or just use /api/auth/register.

Switching hosting (important)
- GitHub Pages cannot run serverless functions. To use the new backend, deploy this site on Cloudflare Pages (recommended) where functions and D1 are supported.
- Alternatively, you can deploy the API separately (Cloudflare Workers) and update API_BASE in src/utils/api.js to point at that domain.

Troubleshooting
- 401 Invalid credentials: verify user exists and password is correct
- 500 on auth endpoints: ensure DB binding (DB) and JWT_SECRET are configured in Pages project settings
- CORS: CORS is open (*) via middleware; tighten as needed for your domain

Additional (Mobile App Support)

Database
- Run migrations in `migrations/` sequentially against your D1 database.
- New: `device_tokens` table to store push tokens (user_id, token PK, platform, updated_at).

API endpoints
- POST `/api/devices` — Register/update a device token. Body: `{ user_id, token, platform? }`.
- DELETE `/api/devices` — Remove a device token. Body: `{ token }`.
- POST `/api/uploads/image` — Temporary stub that echoes a data URL back for base64 images. Replace with Cloudflare R2 in production.

Push notifications (outline)
- Create a Firebase project and Android app (package id), add FCM.
- Store a service-account credential securely (Cloudflare secret). Use a Worker utility to call FCM HTTP v1 API and send to tokens from `device_tokens`.

Uploads (outline)
- Use Cloudflare R2 to store images. Return public URLs consumed by the app (messages, profile avatars).
