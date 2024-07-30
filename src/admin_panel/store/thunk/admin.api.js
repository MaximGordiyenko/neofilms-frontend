import { createAsyncThunk } from '@reduxjs/toolkit';
import * as adminApi from '../../../api/admin';
import { setPassword } from '../../../api/admin';

export const adminLogin = createAsyncThunk('admin/login', async (credentials, thunkAPI) => {
  try {
    const response = await adminApi.login(credentials.login, credentials.password);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const adminCheck = createAsyncThunk('admin/check', async (_, thunkAPI) => {
  try {
    const response = await adminApi.check();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const adminLogout = createAsyncThunk('admin/logout', async (_, thunkAPI) => {
  try {
    await adminApi.logout();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const adminUpdatePassword = createAsyncThunk('admin/updatePassword', async (password, thunkAPI) => {
  try {
    const response = await adminApi.setPassword(password);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
