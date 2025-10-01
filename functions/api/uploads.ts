import { Hono } from 'hono';

type Env = {
  R2_BUCKET?: R2Bucket;
};

const uploads = new Hono<{ Bindings: Env }>();

// Minimal placeholder image upload endpoint.
// In production, switch to Cloudflare R2 and return a public URL.
uploads.post('/image', async (c) => {
  try {
    const body = await c.req.json<{ filename?: string; contentType?: string; dataBase64: string }>();
    const { dataBase64, filename = 'image', contentType = 'image/jpeg' } = body || ({} as any);
    if (!dataBase64) return c.json({ error: 'dataBase64 is required' }, 400);
    // If R2 is configured, store the image and return a public URL-like path
    try {
      if (c.env.R2_BUCKET) {
        const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}-${filename}`.replace(/\s+/g, '-');
        const bytes = Uint8Array.from(atob(dataBase64), c => c.charCodeAt(0));
        await c.env.R2_BUCKET.put(key, bytes, { httpMetadata: { contentType } });
        // Return API proxy path for fetching: /api/uploads/r2/{key}
        const encodedKey = encodeURIComponent(key);
        return c.json({ ok: true, url: `/api/uploads/r2/${encodedKey}`, key, contentType, storage: 'r2' });
      }
    } catch (e) {
      // Fall through to data URL fallback
    }
    // Fallback: echo a data URL back to unblock development
    const url = `data:${contentType};base64,${dataBase64}`;
    return c.json({ ok: true, url, filename, contentType, storage: 'data-url' });
  } catch (e) {
    return c.json({ error: 'Upload failed' }, 500);
  }
});

// Proxy to read files from R2 (private bucket), served via API
uploads.get('/r2/*', async (c) => {
  try {
    if (!c.env.R2_BUCKET) return c.json({ error: 'Storage not configured' }, 501);
    const key = decodeURIComponent(c.req.path.replace(/^.*\/r2\//, ''));
    if (!key) return c.json({ error: 'Missing key' }, 400);
    const obj = await c.env.R2_BUCKET.get(key);
    if (!obj) return c.json({ error: 'Not found' }, 404);
    const headers = new Headers();
    const ct = obj.httpMetadata?.contentType || 'application/octet-stream';
    headers.set('Content-Type', ct);
    if (obj.httpMetadata?.cacheControl) headers.set('Cache-Control', obj.httpMetadata.cacheControl);
    return new Response(obj.body as ReadableStream, { headers, status: 200 });
  } catch (e) {
    return c.json({ error: 'Failed to fetch object' }, 500);
  }
});

export default uploads;
