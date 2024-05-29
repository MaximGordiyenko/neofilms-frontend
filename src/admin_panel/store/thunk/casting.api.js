import { createAsyncThunk } from '@reduxjs/toolkit';
import * as castingApi from '../../../api/casting';

export const getCastings = createAsyncThunk('data/getCastings', async () => {
  const response = await castingApi.getCastings();
  return response.data;
});

export const getCasting = createAsyncThunk('data/getCasting', async (casting_id) => {
  const response = await castingApi.getCasting(casting_id);
  return response.data;
});

export const addCasting = createAsyncThunk('data/addCasting', async (data, thunkAPI) => {
  const response = await castingApi.addCasting();
  if (response.status === 200) {
    thunkAPI.dispatch(getCastings());
    return response.data;
  }
});

export const updateCasting = createAsyncThunk('data/updateCasting', async ({ id, data, thunkAPI }) => {
  const response = await castingApi.editCasting(id, data);
  if (response.status === 200) {
    thunkAPI.dispatch(getCasting());
    return response.data;
  }
});

export const deleteCasting = createAsyncThunk('data/deleteCasting', async (casting_id, thunkAPI) => {
  const response = await castingApi.deleteCasting(casting_id);
  if (response.status === 200) {
    thunkAPI.dispatch(getCastings());
    return response.data;
  }
});
