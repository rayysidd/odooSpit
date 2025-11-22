import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../features/auth/AuthProvider';

export default function LoginContainer() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await login(formData);  // Calls login function from AuthProvider context
      // Redirect to dashboard after successful login
      navigate('/dashboard', { replace: true });
    } catch {
      // Errors handled via auth context (error state)
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
