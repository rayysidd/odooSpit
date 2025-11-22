import * as transactionApi from '../../api/transactionApi';

// Fetch transactions by type (receipt, delivery, transfer)
export const fetchTransactions = async (
  type,
  dispatch,
  setLoading,
  setError,
  setTransactions
) => {
  setLoading(true);
  setError(null);
  try {
    let data = [];
    if (type === 'receipt') data = await transactionApi.fetchReceipts();
    else if (type === 'delivery') data = await transactionApi.fetchDeliveries();
    else if (type === 'transfer') data = await transactionApi.fetchTransfers();
    setTransactions(data);
  } catch (error) {
    setError(error.message || `Failed to fetch ${type}s.`);
  } finally {
    setLoading(false);
  }
};

// Add transaction by type
export const addTransaction = async (
  type,
  transactionData,
  dispatch,
  setLoading,
  setError,
  transactions,
  setTransactions
) => {
  setLoading(true);
  setError(null);
  try {
    let newTx;
    if (type === 'receipt') newTx = await transactionApi.createReceipt(transactionData);
    else if (type === 'delivery') newTx = await transactionApi.createDelivery(transactionData);
    else if (type === 'transfer') newTx = await transactionApi.createTransfer(transactionData);
    setTransactions([...transactions, newTx]);
  } catch (error) {
    setError(error.message || `Failed to add ${type}.`);
  } finally {
    setLoading(false);
  }
};

// Delete transaction by type
export const deleteTransaction = async (
  type,
  id,
  dispatch,
  setLoading,
  setError,
  transactions,
  setTransactions
) => {
  setLoading(true);
  setError(null);
  try {
    if (type === 'receipt') await transactionApi.deleteReceipt(id);
    else if (type === 'delivery') await transactionApi.deleteDelivery(id);
    else if (type === 'transfer') await transactionApi.deleteTransfer(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  } catch (error) {
    setError(error.message || `Failed to delete ${type}.`);
  } finally {
    setLoading(false);
  }
};
