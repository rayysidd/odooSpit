import { useState, useEffect } from 'react';
import DeliveryForm from '../components/transactions/DeliveryForm';
import TransactionList from '../components/transactions/TransactionList';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDeliveries([
      {
        id: 1,
        productSKU: 'SKU001',
        quantity: 30,
        deliveryLocation: 'Shop A',
        date: '2025-11-17',
      },
    ]);
  }, []);

  const addDelivery = (data) => {
    setLoading(true);
    setTimeout(() => {
      setDeliveries((prev) => [...prev, { id: Date.now(), ...data, date: data.deliveryDate }]);
      setLoading(false);
    }, 1000);
  };

  const deleteDelivery = (id) => {
    setDeliveries((prev) => prev.filter((d) => d.id !== id));
  };

  const editDelivery = (id) => {
    // Implement if needed
  };

  return (
    <main className="p-6 space-y-8">
      <DeliveryForm onSubmit={addDelivery} loading={loading} />

      <TransactionList
        transactions={deliveries}
        type="delivery"
        onDelete={deleteDelivery}
        onEdit={editDelivery}
      />
    </main>
  );
}
