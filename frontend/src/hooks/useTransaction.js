import { useState, useEffect, useCallback } from 'react';
import * as transactionApi from '../api/transactionApi';

export default function useTransaction(type) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiMap = {
    receipt: { fetch: transactionApi.fetchReceipts, create: transactionApi.createReceipt },
    delivery: { fetch: transactionApi.fetchDeliveries, create: transactionApi.createDelivery },
    transfer: { fetch: transactionApi.fetchTransfers, create: transactionApi.createTransfer },
    adjustment: { fetch: transactionApi.fetchAdjustments, create: transactionApi.createAdjustment },
  };

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiMap[type].fetch();
      // Map backend _id to frontend id for list components
      setTransactions(data.map(t => ({ ...t, id: t._id })));
    } catch (err) {
      setError(err.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [type]);

  const addTransaction = async (data) => {
    setLoading(true);
    try {
      const newTx = await apiMap[type].create(data);
      setTransactions((prev) => [{ ...newTx, id: newTx._id }, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to add transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, addTransaction, fetchTransactions };
}