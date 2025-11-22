import { useEffect } from 'react';
import ReceiptForm from '../components/transactions/ReceiptForm';
import TransactionList from '../components/transactions/TransactionList';
import useTransaction from '../hooks/useTransaction';
import { useInventory } from '../features/inventory/InventoryProvider';
import Loader from '../components/common/Loader';

export default function Receipts() {
  const { transactions, addTransaction, loading, error } = useTransaction('receipt');
  const { products } = useInventory(); // Needed for SKU lookup

  const handleAddReceipt = async (formData) => {
    // 1. Find Product ID from SKU
    const product = products.find(p => p.sku === formData.productSKU);
    if (!product) {
      alert(`Product with SKU "${formData.productSKU}" not found!`);
      return;
    }

    // 2. Construct Backend Payload
    const payload = {
      reference: `REC-${Date.now()}`,
      type: 'RECEIPT',
      // TODO: Replace these hardcoded location IDs with real ones from a dropdown or settings
      source_location_id: '692167d99983a0c5602ebb1d', // Vendor ID
      dest_location_id: '692169009983a0c5602ebb2f',   // Warehouse ID
      items: [
        {
          product_id: product._id,
          quantity: Number(formData.quantity)
        }
      ]
    };

    await addTransaction(payload);
  };

  // Map transactions for the list view
  const mappedTransactions = transactions.map(t => ({
    id: t._id,
    date: new Date(t.createdAt).toLocaleDateString(),
    productSKU: t.items?.[0]?.product_id || 'Unknown', // Ideally backend Populate sends this
    quantity: t.items?.[0]?.quantity || 0,
    warehouseLocation: 'Main Warehouse'
  }));

  return (
    <main className="p-6 space-y-8">
      {error && <div className="text-red-500">{error}</div>}
      
      <ReceiptForm onSubmit={handleAddReceipt} loading={loading} />

      {loading && transactions.length === 0 ? <Loader /> : (
        <TransactionList
          transactions={mappedTransactions}
          type="receipt"
          onDelete={() => alert("Deletion not supported on ledger")}
          onEdit={() => {}}
        />
      )}
    </main>
  );
}