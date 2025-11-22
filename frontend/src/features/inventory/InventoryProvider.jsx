import React, { createContext, useState, useContext, useEffect } from 'react';
import * as inventoryApi from '../../api/inventoryApi';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await inventoryApi.createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError(err.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await inventoryApi.updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
    } catch (err) {
      setError(err.message || 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await inventoryApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
