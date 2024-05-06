import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAddress = createAsyncThunk('data/getAddress', async (address) => {
  const response = await axios.get(`http://localhost:4001/auth/data?address=${address}`);
  return response.data;
});
