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
    // Ensure user object has expected properties for dashboard
    const userWithDefaults = {
      ...u,
      isAdmin: u?.isAdmin || u?.role === 'Admin' || false,
      name: u?.name || u?.fullName || 'Unknown User',
      email: u?.email || 'user@frc7598.com'
    };
    setUser(userWithDefaults);
    setToken(t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userWithDefaults, token: t }));
  };

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ 
    user, 
    token, 
    loading, 
    saveSession, 
    clearSession,
    isAuthenticated: !!user
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
