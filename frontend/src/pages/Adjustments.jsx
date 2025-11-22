import { useState, useEffect } from 'react';
import AdjustForm from '../components/adjustments/AdjustForm';
import StockLedger from '../components/adjustments/StockLedger';

export default function Adjustments() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEntries([
      {
        id: 1,
        date: '2025-11-10',
        productSKU: 'SKU001',
        adjustmentType: 'increase',
        quantity: 5,
        reason: 'Stock correction after audit',
      },
    ]);
  }, []);

  const addAdjustment = (data) => {
    setLoading(true);
    setTimeout(() => {
      setEntries((prev) => [...prev, { id: Date.now(), ...data }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="p-6 space-y-8">
      <AdjustForm onSubmit={addAdjustment} loading={loading} />

      <StockLedger entries={entries} />
    </main>
  );
}
