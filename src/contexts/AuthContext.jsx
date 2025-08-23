import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'frc7598_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { user: u, token: t } = JSON.parse(raw);
        setUser(u || null);
        setToken(t || null);
      }
    } catch {}
    setLoading(false);
  }, []);

  const saveSession = (u, t) => {
    setUser(u);
    setToken(t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u, token: t }));
  };

  // Merge updates into current user and persist
  const updateUser = (partial) => {
    setUser(prev => {
      const next = { ...(prev || {}), ...(partial || {}) };
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, user: next }));
        }
      } catch {}
      return next;
    });
  };

  // Refresh profile details (name + avatarColor) from server on startup when token exists
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          updateUser({ name: data.username, avatarColor: data.avatar_color ?? null, isAdmin: !!data.is_admin });
        }
      } catch {}
    };
    loadProfile();
    // Only run when token changes
  }, [token]);

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, token, loading, saveSession, clearSession, updateUser }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
