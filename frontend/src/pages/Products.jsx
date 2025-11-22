// odoo\odooSpit\frontend\src\pages\Products.jsx

import { useState, useEffect } from 'react';
import ProductForm from '../components/inventory/ProductForm';
import ProductList from '../components/inventory/ProductList';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load products from API
    setProducts([
      { id: 1, name: 'Product A', sku: 'SKU001', category: 'Cat1', unit: 'pcs', reorderLevel: 50 },
      { id: 2, name: 'Product B', sku: 'SKU002', category: 'Cat2', unit: 'kg', reorderLevel: 20 },
    ]);
  }, []);

  const handleSaveProduct = (productData) => {
    setLoading(true);
    // Save via API (create or update)
    setTimeout(() => {
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...productData } : p))
        );
      } else {
        setProducts((prev) => [
          ...prev,
          { id: Date.now(), ...productData },
        ]);
      }
      setEditingProduct(null);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="p-6 space-y-8 **bg-gray-900 min-h-screen**"> 
      <ProductForm onSubmit={handleSaveProduct} product={editingProduct} loading={loading} onCancel={() => setEditingProduct(null)}/>
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}