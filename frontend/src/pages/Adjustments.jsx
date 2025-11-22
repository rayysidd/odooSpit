import AdjustForm from '../components/adjustments/AdjustForm';
import StockLedger from '../components/adjustments/StockLedger';
import useTransaction from '../hooks/useTransaction';
import { useInventory } from '../features/inventory/InventoryProvider';
import Loader from '../components/common/Loader';

export default function Adjustments() {
  // Use 'adjustment' type we added to the hook
  const { transactions, addTransaction, loading, error } = useTransaction('adjustment');
  const { products } = useInventory();

  const handleAddAdjustment = async (formData) => {
    const product = products.find(p => p.sku === formData.productSKU);
    if (!product) {
      alert("Product SKU not found!");
      return;
    }

    const payload = {
      reference: `ADJ-${Date.now()}`,
      type: 'ADJUSTMENT',
      // For Adjustment: Source is Warehouse, Dest is "Inventory Loss" location (or vice versa)
      source_location_id: '692169009983a0c5602ebb2f', 
      dest_location_id: '692167d99983a0c5602ebb1d', // Placeholder for Loss/Gain location
      items: [{ product_id: product._id, quantity: Number(formData.quantity) }]
    };

    await addTransaction(payload);
  };

  // Map StockOperation to StockLedger format
  const ledgerEntries = transactions.map(t => ({
    id: t._id,
    date: new Date(t.createdAt).toLocaleDateString(),
    productSKU: t.items?.[0]?.product_id, 
    adjustmentType: 'increase', // Simplified for demo
    quantity: t.items?.[0]?.quantity,
    reason: t.reference
  }));

  return (
    <main className="p-6 space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      <AdjustForm onSubmit={handleAddAdjustment} loading={loading} />
      {loading && transactions.length === 0 ? <Loader /> : (
        <StockLedger entries={ledgerEntries} />
      )}
    </main>
  );
}