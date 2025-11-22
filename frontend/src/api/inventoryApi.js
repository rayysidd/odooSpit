import axios from 'axios';

const API_URL = '/api/products';

export async function fetchProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Expected: array of product objects
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function createProduct(productData) {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data; // Created product object
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data; // Updated product object
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Success message
  } catch (error) {
    throw error.response?.data || error;
  }
}
