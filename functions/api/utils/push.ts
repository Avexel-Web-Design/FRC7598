// Server-side push utilities (FCM HTTP v1 via Service Account)
// Designed for Cloudflare Pages Functions (Hono). No external deps.

type CFContext = any;

function base64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === 'string') bytes = new TextEncoder().encode(input);
  else bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function pemToPkcs8ArrayBuffer(pem: string): ArrayBuffer {
  const body = pem.trim().split(/\r?\n/).filter(l => !l.startsWith('---')).join('');
  const bin = atob(body);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function signJwtRS256PKCS1(privateKeyPem: string, header: any, payload: any): Promise<string> {
  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  const keyData = pemToPkcs8ArrayBuffer(privateKeyPem);
  const key = await crypto.subtle.importKey('pkcs8', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(data));
  const sigB64 = base64url(new Uint8Array(signature));
  return `${data}.${sigB64}`;
}

async function getAccessTokenFromServiceAccount(sa: { client_email: string; private_key: string; token_uri?: string }, scopes: string[]): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const payload = { iss: sa.client_email, scope: scopes.join(' '), aud: tokenUri, exp: now + 3600, iat: now };
  const header = { alg: 'RS256', typ: 'JWT' };
  const assertion = await signJwtRS256PKCS1(sa.private_key, header, payload);
  const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion });
  const res = await fetch(tokenUri, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  const json: any = await res.json();
  return String(json.access_token);
}

async function sendFCMv1(serviceAccountJson: string, projectId: string, token: string, title: string, body: string, data?: Record<string, any>) {
  const sa = JSON.parse(serviceAccountJson);
  const accessToken = await getAccessTokenFromServiceAccount(sa, ['https://www.googleapis.com/auth/firebase.messaging']);
  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { token, notification: { title, body }, data: data || {} } }),
  });
  return { ok: res.ok, status: res.status, text: await res.text() };
}

export function stripReplyMarker(content: string): string {
  const m = content?.match(/^::reply\[(\d+)\]::([\s\S]*)$/);
  return m ? m[2] : content || '';
}

export async function sendPushToTokens(c: CFContext, tokens: string[], title: string, body: string, data?: Record<string, any>): Promise<void> {
  if (!tokens || tokens.length === 0) return;
  const saJson = c.env.GOOGLE_SERVICE_ACCOUNT_JSON as string | undefined;
  if (!saJson) return; // not configured
  let projectId: string | undefined;
  try { projectId = JSON.parse(saJson).project_id; } catch {}
  if (!projectId) return;
  await Promise.all(tokens.map(t => sendFCMv1(saJson, projectId as string, t, title, body, data)));
}

export async function sendPushToUsers(c: CFContext, userIds: number[], title: string, body: string, data?: Record<string, any>): Promise<void> {
  if (!userIds || userIds.length === 0) return;
  const placeholders = userIds.map(() => '?').join(',');
  const q = await c.env.DB.prepare(`SELECT DISTINCT token FROM device_tokens WHERE user_id IN (${placeholders})`).bind(...userIds).all();
  const tokens = ((q.results as any[]) || []).map(r => r.token).filter(Boolean);
  await sendPushToTokens(c, tokens, title, body, data);
}
