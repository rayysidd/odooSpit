import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx'; // Added .jsx extension
import { useAuth } from '../../features/auth/AuthProvider.jsx'; // Added .jsx extension

export default function LoginContainer() {
  // Destructure loading and error states from the useAuth hook
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      // Await the login function. It should handle the API call
      // and update the global authentication state (e.g., setting the user token).
      await login(formData);

      // If the promise resolves (login was successful), navigate to the dashboard.
      // The login function in AuthProvider MUST have reset 'loading' to false
      // before this point for the LoginForm button to be re-enabled.
      navigate('/dashboard', { replace: true });
    } catch (e) {
      // The login function (in AuthProvider) should handle setting the 'error' state
      // and ensure 'loading' is reset to false even on failure.
      // We log the error here just for debugging, but the user sees the error state.
      console.error("Login failed:", e);
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}