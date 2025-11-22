import DeliveryForm from '../components/transactions/DeliveryForm';
import TransactionList from '../components/transactions/TransactionList';
import useTransaction from '../hooks/useTransaction';
import { useInventory } from '../features/inventory/InventoryProvider';
import Loader from '../components/common/Loader';

export default function Deliveries() {
  const { transactions, addTransaction, loading, error } = useTransaction('delivery');
  const { products } = useInventory();

  const handleAddDelivery = async (formData) => {
    const product = products.find(p => p.sku === formData.productSKU);
    if (!product) {
      alert("Product SKU not found!");
      return;
    }

    const payload = {
      reference: `DEL-${Date.now()}`,
      type: 'DELIVERY',
      source_location_id: '692169009983a0c5602ebb2f', // Warehouse ID (From)
      dest_location_id: '692167d99983a0c5602ebb1d',   // Customer ID (To)
      items: [{ product_id: product._id, quantity: Number(formData.quantity) }]
    };

    await addTransaction(payload);
  };

  const mappedTransactions = transactions.map(t => ({
    id: t._id,
    date: new Date(t.createdAt).toLocaleDateString(),
    productSKU: t.items?.[0]?.product_id, // Need Populate on backend to show Name/SKU
    quantity: t.items?.[0]?.quantity,
    deliveryLocation: 'Customer Location'
  }));

  return (
    <main className="p-6 space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      <DeliveryForm onSubmit={handleAddDelivery} loading={loading} />
      {loading && transactions.length === 0 ? <Loader /> : (
        <TransactionList transactions={mappedTransactions} type="delivery" onDelete={() => {}} onEdit={() => {}} />
      )}
    </main>
  );
}