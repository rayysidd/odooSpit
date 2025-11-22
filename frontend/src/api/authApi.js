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
    return response.data;  // { token, user }
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

// Add OTP or password reset APIs if implemented in backend
export async function requestOTP(email) {
  try {
    const response = await axios.post(`${AUTH_API_URL}/request-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function verifyOTP(data) {
  try {
    const response = await axios.post(`${AUTH_API_URL}/verify-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
