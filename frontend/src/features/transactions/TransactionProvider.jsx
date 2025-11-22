import React, { createContext, useState, useContext, useEffect } from 'react';
import * as transactionApi from '../../api/transactionApi';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [receipts, setReceipts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReceipts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionApi.fetchReceipts();
      setReceipts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch receipts');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionApi.fetchDeliveries();
      setDeliveries(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch deliveries');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransfers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionApi.fetchTransfers();
      setTransfers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch transfers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
    fetchDeliveries();
    fetchTransfers();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        receipts,
        deliveries,
        transfers,
        loading,
        error,
        setReceipts,
        setDeliveries,
        setTransfers,
        fetchReceipts,
        fetchDeliveries,
        fetchTransfers,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
