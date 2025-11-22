import axios from 'axios';

const API_URL = '/api/products';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export async function fetchProducts() {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function createProduct(productData) {
  try {
    const response = await axios.post(API_URL, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}