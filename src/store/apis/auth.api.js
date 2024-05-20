import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from './base.js';

export const getAddress = createAsyncThunk('data/getAddress', async (address) => {
  try {
    const response = await baseApi.get(`/auth/data?address=${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
