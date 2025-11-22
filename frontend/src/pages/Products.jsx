import { useState, useEffect } from 'react';
import ProductForm from '../components/inventory/ProductForm';
import ProductList from '../components/inventory/ProductList';
import { useInventory } from '../features/inventory/InventoryProvider';
import Loader from '../components/common/Loader';

export default function Products() {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, loading, error } = useInventory();
  const [editingProduct, setEditingProduct] = useState(null);

  // Products are fetched automatically by the Provider on mount

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await addProduct(productData);
      }
      setEditingProduct(null);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id || p.id === id);
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  // Map backend _id to id for the list component
  const mappedProducts = products.map(p => ({ ...p, id: p._id }));

  if (loading && products.length === 0) return <Loader />;

  return (
    <main className="p-6 space-y-8">
      {error && <div className="bg-red-500 text-white p-3 rounded">{error}</div>}
      
      <ProductForm 
        onSubmit={handleSaveProduct} 
        product={editingProduct} 
        loading={loading} 
      />

      <ProductList 
        products={mappedProducts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </main>
  );
}