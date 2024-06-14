import { createAsyncThunk } from '@reduxjs/toolkit';
import * as adminApi from '../../../api/admin';

export const adminLogin = createAsyncThunk('data/adminLogin', async (data) => {
  const response = await adminApi.login(data.login, data.password);
  return response.status;
});

export const adminLogout = createAsyncThunk('data/adminLogout', async () => {
  const response = await adminApi.logout();
  return response.status;
});

export const adminCheck = createAsyncThunk('data/adminCheck', async () => {
  try {
    const response = await adminApi.check();
    return response.status;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
  }
});
