import { createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../api/Auth.api.js';

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAddress.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const { updateField } = authSlicer.actions;
export default authSlicer.reducer;
