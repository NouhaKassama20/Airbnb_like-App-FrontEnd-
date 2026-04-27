// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on first render
    const saved = localStorage.getItem('host_user');
    return saved ? JSON.parse(saved) : null;
  });

  const hostLogin = async (credentials) => {
    const response = await fetch('/api/hosts/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    // Save user with host_id to localStorage
    const hostUser = { ...data.host };
    localStorage.setItem('host_user', JSON.stringify(hostUser));
    setUser(hostUser);
    return data;
  };

  const hostSignup = async (userData) => {
    const response = await fetch('/api/hosts/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    const hostUser = { ...data.host };
    localStorage.setItem('host_user', JSON.stringify(hostUser));
    setUser(hostUser);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('host_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, hostLogin, hostSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}