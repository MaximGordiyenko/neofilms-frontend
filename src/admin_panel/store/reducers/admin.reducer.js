import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, adminCheck, adminLogout, adminUpdatePassword } from '../thunk/admin.api.js';

const adminSlicer = createSlice({
  name: 'admin',
  initialState: {
    status: null,
    loading: false,
    error: null,
    password: '',
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
        state.status = 200;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminUpdatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 200;
        state.password = action.payload;
      })
      .addCase(adminUpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 200;
      })
      .addCase(adminCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.status = null;
        state.loading = false;
        state.error = null;
      });
  }
});

export const {  } = adminSlicer.actions;
export default adminSlicer.reducer;
