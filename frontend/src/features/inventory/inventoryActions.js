import * as inventoryApi from '../../api/inventoryApi';

// Fetch all products
export const fetchProducts = async (dispatch, setLoading, setError, setProducts) => {
  setLoading(true);
  setError(null);
  try {
    const products = await inventoryApi.fetchProducts();
    setProducts(products);
  } catch (error) {
    setError(error.message || 'Failed to fetch products.');
  } finally {
    setLoading(false);
  }
};

// Add new product
export const addProduct = async (productData, dispatch, setLoading, setError, products, setProducts) => {
  setLoading(true);
  setError(null);
  try {
    const newProduct = await inventoryApi.createProduct(productData);
    setProducts([...products, newProduct]);
  } catch (error) {
    setError(error.message || 'Failed to add product.');
  } finally {
    setLoading(false);
  }
};

// Update existing product
export const updateProduct = async (id, productData, dispatch, setLoading, setError, products, setProducts) => {
  setLoading(true);
  setError(null);
  try {
    const updatedProduct = await inventoryApi.updateProduct(id, productData);
    setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
  } catch (error) {
    setError(error.message || 'Failed to update product.');
  } finally {
    setLoading(false);
  }
};

// Delete product
export const deleteProduct = async (id, dispatch, setLoading, setError, products, setProducts) => {
  setLoading(true);
  setError(null);
  try {
    await inventoryApi.deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  } catch (error) {
    setError(error.message || 'Failed to delete product.');
  } finally {
    setLoading(false);
  }
};
