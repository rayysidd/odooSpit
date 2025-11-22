import { useState, useEffect } from 'react';
import * as transactionApi from '../api/transactionApi';

export default function useTransaction(type) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiMap = {
    receipt: {
      fetch: transactionApi.fetchReceipts,
      create: transactionApi.createReceipt,
      delete: transactionApi.deleteReceipt,
    },
    delivery: {
      fetch: transactionApi.fetchDeliveries,
      create: transactionApi.createDelivery,
      delete: transactionApi.deleteDelivery,
    },
    transfer: {
      fetch: transactionApi.fetchTransfers,
      create: transactionApi.createTransfer,
      delete: transactionApi.deleteTransfer,
    },
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiMap[type].fetch();
      setTransactions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    setLoading(true);
    setError(null);
    try {
      const newTransaction = await apiMap[type].create(transactionData);
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (err) {
      setError(err.message || 'Failed to add transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiMap[type].delete(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
}
