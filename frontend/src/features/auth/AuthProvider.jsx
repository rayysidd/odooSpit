import React, { createContext, useState, useContext } from 'react';
import * as authApi from '../../api/authApi';

// Initial state for the context
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    login: async () => {},
    logout: () => {},
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  // State management for authentication data
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle user login
  const login = async (credentials) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Call the API function
      const data = await authApi.login(credentials);
      // Store user details and token from the successful response
      setUser(data.user);
      setToken(data.token);
      
    } catch (err) {
      // Error handling: extract message from the response data or use a fallback
      // The error message should be simple (e.g., "Invalid credentials")
      const errorMessage = err.message || (err.data?.message) || 'Login failed due to network or server issue.';
      setError(errorMessage);
      throw err; // Re-throw the error to be caught by the calling component (LoginForm)
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = () => {
    // Clear the token and user data
    setUser(null);
    setToken(null);
    // You should also clear the token from persistent storage (like cookies or local storage) here.
    // Call the server logout endpoint if session management is involved
    authApi.logout().catch(console.error); 
  };

  // The context value to be provided to consuming components
  const value = { user, token, loading, error, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy context consumption
export function useAuth() {
  return useContext(AuthContext);
}