import axios from 'axios';

const API_URL = '/api/users';

export async function fetchUserProfile() {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data; // User profile object
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function updateUserProfile(data) {
  try {
    const response = await axios.put(`${API_URL}/me`, data);
    return response.data; // Updated user profile
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function changePassword(data) {
  try {
    const response = await axios.post(`${API_URL}/change-password`, data);
    return response.data; // Success message
  } catch (error) {
    throw error.response?.data || error;
  }
}
