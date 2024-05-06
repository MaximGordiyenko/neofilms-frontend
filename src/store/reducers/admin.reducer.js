import { createSlice } from '@reduxjs/toolkit';
import { adminLogin } from '../api/admin.api.js';

const adminSlicer = createSlice({
  name: 'admin',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const {  } = adminSlicer.actions;
export default adminSlicer.reducer;
