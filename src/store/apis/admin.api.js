import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const adminLogin = createAsyncThunk('data/adminLogin', async (data) => {
  const response = await axios.post(`/admin/login`, data, { withCredentials: "include" });
  console.log(response);
  return response.status;
});

export const adminCheck = createAsyncThunk('data/adminCheck', async () => {
  try {
    const response = await axios.get(`/admin/check`);
    console.log(response);
    return response.status;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
  }
});
