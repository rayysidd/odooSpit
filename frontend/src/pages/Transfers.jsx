import TransferForm from '../components/transactions/TransferForm';
import TransactionList from '../components/transactions/TransactionList';
import useTransaction from '../hooks/useTransaction';
import { useInventory } from '../features/inventory/InventoryProvider';
import Loader from '../components/common/Loader';

export default function Transfers() {
  const { transactions, addTransaction, loading, error } = useTransaction('transfer');
  const { products } = useInventory();

  const handleAddTransfer = async (formData) => {
    const product = products.find(p => p.sku === formData.productSKU);
    if (!product) {
      alert("Product SKU not found!");
      return;
    }

    // Note: For transfers, you likely want real Location IDs from a dropdown
    // For now, we use hardcoded IDs for demo purposes
    const payload = {
      reference: `INT-${Date.now()}`,
      type: 'INTERNAL',
      source_location_id: '692169009983a0c5602ebb2f', // Warehouse A
      dest_location_id: '692169009983a0c5602ebb2f',   // Warehouse B (Demo: Same ID used as placeholder)
      items: [{ product_id: product._id, quantity: Number(formData.quantity) }]
    };

    await addTransaction(payload);
  };

  const mappedTransactions = transactions.map(t => ({
    id: t._id,
    date: new Date(t.createdAt).toLocaleDateString(),
    productSKU: t.items?.[0]?.product_id,
    quantity: t.items?.[0]?.quantity,
    fromLocation: 'Warehouse A',
    toLocation: 'Warehouse B'
  }));

  return (
    <main className="p-6 space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      <TransferForm onSubmit={handleAddTransfer} loading={loading} />
      {loading && transactions.length === 0 ? <Loader /> : (
        <TransactionList transactions={mappedTransactions} type="transfer" onDelete={() => {}} onEdit={() => {}} />
      )}
    </main>
  );
}