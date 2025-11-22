import { useState, useEffect } from 'react';
import * as authApi from '../api/authApi';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      // Optional: fetch user profile on token change/initial load
      authApi
        .fetchUserProfile()
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('authToken');
        });
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    // Optionally notify backend
    authApi.logout().catch(() => {});
  };

  return { user, token, loading, error, login, logout };
}
