import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, adminCheck } from '../thunk/admin.api.js';

const adminSlicer = createSlice({
  name: 'admin',
  initialState: {
    status: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(adminCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(adminCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {  } = adminSlicer.actions;
export default adminSlicer.reducer;
