import * as userApi from '../../api/userApi';

// Fetch user profile
export const fetchUserProfile = async (dispatch, setLoading, setError, setUser) => {
  setLoading(true);
  setError(null);
  try {
    const data = await userApi.fetchUserProfile();
    setUser(data);
  } catch (error) {
    setError(error.message || 'Failed to fetch user profile.');
  } finally {
    setLoading(false);
  }
};

// Update user profile
export const updateUserProfile = async (
  profileData,
  dispatch,
  setLoading,
  setError,
  setUser
) => {
  setLoading(true);
  setError(null);
  try {
    const updatedUser = await userApi.updateUserProfile(profileData);
    setUser(updatedUser);
  } catch (error) {
    setError(error.message || 'Failed to update profile.');
  } finally {
    setLoading(false);
  }
};

// Change user password
export const changePassword = async (passwordData, dispatch, setLoading, setError) => {
  setLoading(true);
  setError(null);
  try {
    await userApi.changePassword(passwordData);
  } catch (error) {
    setError(error.message || 'Failed to change password.');
  } finally {
    setLoading(false);
  }
};
