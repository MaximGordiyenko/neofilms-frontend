import { createSlice } from '@reduxjs/toolkit';
import { getSlides, addSlide, updateSlide, getMediaOfSlide, deleteSlide, getSlide } from '../apis/slide.api.js';

const slideReducer = createSlice({
  name: 'slide',
  initialState: {
    slides: [],
    slide: {},
    mediaUrl: '',
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
      .addCase(getSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = action.payload;
      })
      .addCase(getSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSlide.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSlide.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getMediaOfSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMediaOfSlide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mediaUrl = action.payload;
      })
      .addCase(getMediaOfSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSlide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slide = action.payload;
      })
      .addCase(getSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSlide.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
    
  }
});

export const { updateField } = slideReducer.actions;
export default slideReducer.reducer;
