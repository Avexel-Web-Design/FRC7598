import { Hono } from 'hono';
import { verify } from 'hono/jwt';

type Env = {
  DB: D1Database;
  JWT_SECRET: string;
  // Legacy key (deprecated). Prefer GOOGLE_SERVICE_ACCOUNT_JSON for HTTP v1.
  FCM_SERVER_KEY?: string;
  // Full JSON of the Google service account key (stringified file contents)
  GOOGLE_SERVICE_ACCOUNT_JSON?: string;
};

type JwtUser = { id: number; name?: string; isAdmin?: boolean };

const push = new Hono<{ Bindings: Env }>();

async function getAuthUser(c: any): Promise<JwtUser | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded: any = await verify(token, c.env.JWT_SECRET);
    return { id: Number(decoded.id), name: decoded.name, isAdmin: !!decoded.isAdmin };
  } catch {
    return null;
  }
}

// Utilities for HTTP v1 OAuth (Service Account) in Cloudflare Workers
function base64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  }
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  return b64;
}

function pemToPkcs8ArrayBuffer(pem: string): ArrayBuffer {
  const lines = pem.trim().split(/\r?\n/);
  const body = lines.filter(l => !l.startsWith('---')).join('');
  const binary = atob(body);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function signJwtRS256PKCS1(privateKeyPem: string, header: any, payload: any): Promise<string> {
  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  const keyData = pemToPkcs8ArrayBuffer(privateKeyPem);
  const key = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(data));
  const sigB64 = base64url(new Uint8Array(signature));
  return `${data}.${sigB64}`;
}

async function getAccessTokenFromServiceAccount(sa: { client_email: string; private_key: string; token_uri?: string }, scopes: string[]): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const payload = {
    iss: sa.client_email,
    scope: scopes.join(' '),
    aud: tokenUri,
    exp: now + 3600,
    iat: now,
  };
  const header = { alg: 'RS256', typ: 'JWT' };
  const assertion = await signJwtRS256PKCS1(sa.private_key, header, payload);
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  });
  const res = await fetch(tokenUri, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }
  const json: any = await res.json();
  return String(json.access_token);
}

async function sendFCMv1(serviceAccountJson: string, projectId: string, token: string, title: string, body: string, data?: Record<string, any>) {
  const sa = JSON.parse(serviceAccountJson);
  const accessToken = await getAccessTokenFromServiceAccount(sa, ['https://www.googleapis.com/auth/firebase.messaging']);
  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        token,
        notification: { title, body },
        data: data || {},
      },
    }),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

// POST /api/push/test -> send a test notification to the authenticated user's devices (or a specific token)
push.post('/test', async (c) => {
  const user = await getAuthUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const { title = 'Test Notification', body = 'Hello from FRC7598', token, route = '/channels', channelId, dmId } = await c.req.json().catch(() => ({}));
  const saJson = c.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  let projectId: string | undefined;
  if (saJson) {
    try { projectId = JSON.parse(saJson).project_id; } catch {}
  }
  const usingV1 = !!(saJson && projectId);
  if (!usingV1 && !c.env.FCM_SERVER_KEY) {
    return c.json({ error: 'Push not configured: add GOOGLE_SERVICE_ACCOUNT_JSON (preferred) or FCM_SERVER_KEY (legacy) in Pages secrets' }, 501);
  }

  try {
    let tokens: string[] = [];
    if (token) {
      tokens = [String(token)];
    } else {
      const { results } = await c.env.DB.prepare('SELECT token FROM device_tokens WHERE user_id = ?').bind(user.id).all();
      tokens = (results || []).map((r: any) => r.token).filter(Boolean);
    }
    if (tokens.length === 0) return c.json({ error: 'No device tokens found' }, 404);

    const results: any[] = [];
    for (const t of tokens) {
      // include a simple route hint; app can read it later
      let r;
      if (usingV1) {
        r = await sendFCMv1(saJson as string, projectId as string, t, title, body, { route, channelId, dmId });
      } else {
        // Fallback only if legacy is enabled in your project
        r = await (async () => {
          const serverKey = c.env.FCM_SERVER_KEY as string;
          const res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST', headers: { 'Authorization': `key=${serverKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: t, notification: { title, body }, data: { route, channelId, dmId }, priority: 'high' }),
          });
          return { ok: res.ok, status: res.status, text: await res.text() };
        })();
      }
      results.push({ token: t.slice(0, 12) + '…', status: r.status, ok: r.ok });
    }
    return c.json({ ok: true, sent: results });
  } catch (e) {
    return c.json({ error: 'Failed to send push' }, 500);
  }
});

export default push;
