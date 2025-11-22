import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../api/authApi';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await authApi.login(credentials);
      return response; // expected { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, thunkAPI) => {
    try {
      const response = await authApi.signup(userData);
      return response; // expected user info or token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Signup failed');
    }
  }
);

// Async thunk to request OTP for password reset
export const requestPasswordResetOTP = createAsyncThunk(
  'auth/requestPasswordResetOTP',
  async (email, thunkAPI) => {
    try {
      const response = await authApi.requestOTP(email);
      return response; // expected success msg
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'OTP request failed');
    }
  }
);

// Async thunk to verify OTP for password reset
export const verifyPasswordResetOTP = createAsyncThunk(
  'auth/verifyPasswordResetOTP',
  async (otpData, thunkAPI) => {
    try {
      const response = await authApi.verifyOTP(otpData);
      return response; // expected reset token or success msg
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const response = await authApi.logout();
    return response;
  } catch {
    // Optional: ignore error for logout
    return thunkAPI.fulfillWithValue();
  }
});
