import axios from 'axios';

const receiptUrl = '/api/receipts';
const deliveryUrl = '/api/deliveries';
const transferUrl = '/api/transfers';

export async function fetchReceipts() {
  try {
    const response = await axios.get(receiptUrl);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function createReceipt(data) {
  try {
    const response = await axios.post(receiptUrl, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function deleteReceipt(id) {
  try {
    const response = await axios.delete(`${receiptUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Same pattern for Deliveries

export async function fetchDeliveries() {
  try {
    const response = await axios.get(deliveryUrl);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function createDelivery(data) {
  try {
    const response = await axios.post(deliveryUrl, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function deleteDelivery(id) {
  try {
    const response = await axios.delete(`${deliveryUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Same pattern for Transfers

export async function fetchTransfers() {
  try {
    const response = await axios.get(transferUrl);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function createTransfer(data) {
  try {
    const response = await axios.post(transferUrl, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function deleteTransfer(id) {
  try {
    const response = await axios.delete(`${transferUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
