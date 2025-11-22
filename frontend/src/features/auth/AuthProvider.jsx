import React, { createContext, useState, useContext } from 'react';
import * as authApi from '../../api/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. Initialize state from localStorage so sessions survive page refreshes
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login Function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      
      // A. Update React State (UI updates immediately)
      setUser(data.user);
      setToken(data.token);
      
      // B. Persist to LocalStorage (Crucial for Dashboard API calls)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
    } catch (err) {
      const errorMessage = err.message || (err.data?.message) || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    // Clear State
    setUser(null);
    setToken(null);
    
    // Clear Storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    authApi.logout().catch(console.error);
  };

  const value = { user, token, loading, error, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}