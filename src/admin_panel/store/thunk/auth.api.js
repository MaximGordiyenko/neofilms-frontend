import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../../api/auth';

export const getAddress = createAsyncThunk('data/getAddress', async (address) => {
  try {
    const response = await authApi.getData(address);
    return response.data;
  } catch (error) {
    throw error;
  }
});
