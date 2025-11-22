import React, { useState } from 'react';
import SignupForm from './SignupForm';  // Your existing SignupForm.jsx
import * as authApi from '../../api/authApi'; // Your signup API functions

export default function SignupContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const data = await authApi.signup(formData);
      alert('Signup successful! Please log in.');
      // Optionally redirect to login page here
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return <SignupForm onSubmit={handleSignup} loading={loading} error={error} />;
}
