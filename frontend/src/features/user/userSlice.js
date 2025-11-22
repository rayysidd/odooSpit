import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const data = await userApi.fetchUserProfile();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user profile');
  }
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (profileData, thunkAPI) => {
  try {
    const updatedUser = await userApi.updateUserProfile(profileData);
    return updatedUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update profile');
  }
});

export const changePassword = createAsyncThunk('user/changePassword', async (passwordData, thunkAPI) => {
  try {
    const response = await userApi.changePassword(passwordData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to change password');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
