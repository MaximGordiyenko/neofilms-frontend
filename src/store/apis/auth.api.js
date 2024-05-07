import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAddress = createAsyncThunk('data/getAddress', async (address) => {
  try {
    const response = await axios.get(`http://localhost:4001/auth/data?address=${address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
