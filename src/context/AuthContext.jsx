import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // { user_id, full_name, email, role, ... }
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) fetchProfile(data.session.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) fetchProfile(newSession.user.id);
      else { setUser(null); setLoading(false); }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('users')
      .select('user_id, full_name, email, username, wilaya')
      .eq('user_id', userId)
      .single();

    // Check which role table this user belongs to
    const { data: hostRow }  = await supabase.from('host').select('host_id').eq('host_id', userId).maybeSingle();
    const { data: guestRow } = await supabase.from('guest').select('guest_id').eq('guest_id', userId).maybeSingle();
    const { data: adminRow } = await supabase.from('admin').select('admin_id').eq('admin_id', userId).maybeSingle();

    const role = hostRow ? 'host' : guestRow ? 'guest' : adminRow ? 'admin' : 'unknown';

    setUser({ ...data, role });
    setLoading(false);
  };

  // ── Host Sign Up ─────────────────────────────────────────────
  const hostSignup = async ({ full_name, email, password, username }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/host/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, username }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    return data;
  };

  // ── Host Login ───────────────────────────────────────────────
  const hostLogin = async ({ email, password }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/host/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    // Set session in supabase client so RLS works for subsequent queries
    await supabase.auth.setSession({
      access_token:  data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    setUser({ ...data.user, role: 'host' });
    return data;
  };

  // ── Logout ───────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, hostSignup, hostLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
