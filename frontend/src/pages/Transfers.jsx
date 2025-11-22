import { useState, useEffect } from 'react';
import TransferForm from '../components/transactions/TransferForm';
import TransactionList from '../components/transactions/TransactionList';

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTransfers([
      {
        id: 1,
        productSKU: 'SKU001',
        quantity: 10,
        fromLocation: 'Warehouse A',
        toLocation: 'Warehouse B',
        date: '2025-11-18',
      },
    ]);
  }, []);

  const addTransfer = (data) => {
    setLoading(true);
    setTimeout(() => {
      setTransfers((prev) => [...prev, { id: Date.now(), ...data, date: data.transferDate }]);
      setLoading(false);
    }, 1000);
  };

  const deleteTransfer = (id) => {
    setTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransfer = (id) => {
    // Implement if needed
  };

  return (
    <main className="p-6 space-y-8">
      <TransferForm onSubmit={addTransfer} loading={loading} />

      <TransactionList
        transactions={transfers}
        type="transfer"
        onDelete={deleteTransfer}
        onEdit={editTransfer}
      />
    </main>
  );
}
