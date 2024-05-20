import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const adminLogin = createAsyncThunk('data/adminLogin', async (data) => {
  try {
    const response = await axios.post(`/admin/login`, data, { withCredentials: "include" });
    return response.data;
  } catch (error) {
    throw error;
  }
});
