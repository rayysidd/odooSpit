import { useState, useEffect } from 'react';
import ReceiptForm from '../components/transactions/ReceiptForm';
import TransactionList from '../components/transactions/TransactionList';

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing receipts
    setReceipts([
      {
        id: 1,
        productSKU: 'SKU001',
        quantity: 100,
        warehouseLocation: 'Warehouse A',
        date: '2025-11-15',
      },
    ]);
  }, []);

  const addReceipt = (data) => {
    setLoading(true);
    setTimeout(() => {
      setReceipts((prev) => [...prev, { id: Date.now(), ...data, date: data.receivedDate }]);
      setLoading(false);
    }, 1000);
  };

  const deleteReceipt = (id) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
  };

  const editReceipt = (id) => {
    // Implement if needed
  };

  return (
    <main className="p-6 space-y-8">
      <ReceiptForm onSubmit={addReceipt} loading={loading} />

      <TransactionList
        transactions={receipts}
        type="receipt"
        onDelete={deleteReceipt}
        onEdit={editReceipt}
      />
    </main>
  );
}
