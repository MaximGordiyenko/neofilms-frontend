import { createSlice } from '@reduxjs/toolkit';
import { getCastings, addCasting, updateCasting, getCasting, deleteCasting } from '../thunk/casting.api';

const castingReducer = createSlice({
  name: 'casting',
  initialState: {
    castings: [],
    casting: {},
    status: 'idle',
    error: null
  },
  reducers: {
    updateField(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCastings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCastings.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.castings = payload;
      })
      .addCase(getCastings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addCasting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCasting.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCasting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateCasting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCasting.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateCasting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getCasting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCasting.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.casting = payload;
      })
      .addCase(getCasting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteCasting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCasting.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCasting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const { updateField } = castingReducer.actions;
export default castingReducer.reducer;
