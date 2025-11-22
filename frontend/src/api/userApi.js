import axios from 'axios';

const USER_API_URL = '/api/users';

// Fetch logged-in user profile
export async function fetchUserProfile() {
  try {
    const response = await axios.get(`${USER_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Update user profile data
export async function updateUserProfile(data) {
  try {
    const response = await axios.put(`${USER_API_URL}/me`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Change user password
export async function changePassword(data) {
  try {
    const response = await axios.post(`${USER_API_URL}/change-password`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
