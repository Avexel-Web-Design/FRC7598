const frcAPI = {
  async request(method, path, data) {
    const headers = { 'Content-Type': 'application/json' };
    let token;
    try {
      const raw = localStorage.getItem('frc7598_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        token = parsed?.token;
      }
    } catch {}
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`/api${path}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return res;
  },
  get(path) { return this.request('GET', path); },
  post(path, data) { return this.request('POST', path, data); },
  put(path, data) { return this.request('PUT', path, data); },
  delete(path) { return this.request('DELETE', path); },
};

export default frcAPI;
