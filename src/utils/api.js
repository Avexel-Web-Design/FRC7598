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
  login: ({ fullName, password }) => {
    // Mock login for testing - in real app this would call the backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fullName && password) {
          resolve({
            user: {
              id: 1,
              name: fullName,
              fullName: fullName,
              email: `${fullName.toLowerCase().replace(' ', '.')}@frc7598.com`,
              role: 'Member',
              isAdmin: fullName.toLowerCase().includes('admin') || fullName.toLowerCase().includes('coach')
            },
            token: 'mock-jwt-token-for-demo'
          });
        } else {
          reject(new Error('Please enter both name and password'));
        }
      }, 500);
    });
  },
  register: ({ fullName, password, is_admin }) => request('/auth/register', { method: 'POST', body: { fullName, password, is_admin } }),
  health: () => request('/health'),
};

export default api;
