import axios from 'axios';

const AUTH_API_URL = '/api/auth';

export async function signup(userData) {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function login(credentials) {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, credentials);
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${AUTH_API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// --- CORRECTED OTP ROUTES ---
export async function requestOTP(email) {
  try {
    // Backend expects /forgot-password
    const response = await axios.post(`${AUTH_API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function verifyOTP(data) {
  try {
    // Backend expects /reset-password with { email, otp, newPassword }
    const response = await axios.post(`${AUTH_API_URL}/reset-password`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}