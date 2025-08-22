const API_BASE = '/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  login: ({ fullName, password }) => request('/auth/login', { method: 'POST', body: { fullName, password } }),
  register: ({ fullName, password, is_admin }) => request('/auth/register', { method: 'POST', body: { fullName, password, is_admin } }),
  health: () => request('/health'),
};

export default api;
