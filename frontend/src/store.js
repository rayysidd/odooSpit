// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authslice';
import inventoryReducer from './features/inventory/inventorySlice';
import transactionReducer from './features/transactions/transactionSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    transactions: transactionReducer,
    user: userReducer,
  },
});

export default store;
