import axios from 'axios';

const STOCK_API_URL = '/api/stock/operations';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const fetchOperations = async (type) => {
  try {
    const response = await axios.get(STOCK_API_URL, {
      params: { type },
      ...getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const createOperation = async (payload) => {
  try {
    const response = await axios.post(STOCK_API_URL, payload, getAuthHeader());
    return response.data.operation;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- EXPORTS ---

export const fetchReceipts = () => fetchOperations('RECEIPT');
export const createReceipt = (data) => createOperation(data);

export const fetchDeliveries = () => fetchOperations('DELIVERY');
export const createDelivery = (data) => createOperation(data);

export const fetchTransfers = () => fetchOperations('INTERNAL');
export const createTransfer = (data) => createOperation(data);

export const fetchAdjustments = () => fetchOperations('ADJUSTMENT');
export const createAdjustment = (data) => createOperation(data);

// Backend doesn't typically "delete" ledger entries, but we can stub it
export const deleteTransaction = async (id) => { console.warn("Delete not implemented on ledger"); };