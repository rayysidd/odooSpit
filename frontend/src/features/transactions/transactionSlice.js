import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as transactionApi from '../../api/transactionApi';

export const fetchReceipts = createAsyncThunk('transactions/fetchReceipts', async (_, thunkAPI) => {
  try {
    const data = await transactionApi.fetchReceipts();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch receipts');
  }
});

export const fetchDeliveries = createAsyncThunk('transactions/fetchDeliveries', async (_, thunkAPI) => {
  try {
    const data = await transactionApi.fetchDeliveries();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch deliveries');
  }
});

export const fetchTransfers = createAsyncThunk('transactions/fetchTransfers', async (_, thunkAPI) => {
  try {
    const data = await transactionApi.fetchTransfers();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch transfers');
  }
});

// Similar createAsyncThunk for add/delete can be added here

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    receipts: [],
    deliveries: [],
    transfers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Receipts
      .addCase(fetchReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = action.payload;
      })
      .addCase(fetchReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deliveries
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Transfers
      .addCase(fetchTransfers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers = action.payload;
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
