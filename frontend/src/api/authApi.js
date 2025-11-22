import axios from 'axios';

const API_URL = '/api/auth';

export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Expected: { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function signup(userData) {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Expected: Created user info or token
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function requestOTP(email) {
  try {
    const response = await axios.post(`${API_URL}/request-otp`, { email });
    return response.data; // Expected: success message
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function verifyOTP(data) {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, data);
    return response.data; // Expected: reset token or success confirmation
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function logout() {
  // Optional, depends on auth strategy (invalidate token, etc.)
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
