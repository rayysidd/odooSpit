    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as inventoryApi from '../../api/inventoryApi';

// Async actions (thunks)
export const fetchProducts = createAsyncThunk(
  'inventory/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const products = await inventoryApi.fetchProducts();
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const addProduct = createAsyncThunk(
  'inventory/addProduct',
  async (productData, thunkAPI) => {
    try {
      const newProduct = await inventoryApi.createProduct(productData);
      return newProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'inventory/updateProduct',
  async ({ id, productData }, thunkAPI) => {
    try {
      const updatedProduct = await inventoryApi.updateProduct(id, productData);
      return updatedProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'inventory/deleteProduct',
  async (id, thunkAPI) => {
    try {
      await inventoryApi.deleteProduct(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = inventorySlice.actions;

export default inventorySlice.reducer;
