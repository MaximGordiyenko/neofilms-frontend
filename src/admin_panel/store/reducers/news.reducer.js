import { createSlice } from '@reduxjs/toolkit';
import { getNews } from '../thunk/news';

const newsReducer = createSlice({
  name: 'news',
  initialState: {
    news: [],
    mediaUrl: '',
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
  }
});

export const { updateField } = newsReducer.actions;
export default newsReducer.reducer;
