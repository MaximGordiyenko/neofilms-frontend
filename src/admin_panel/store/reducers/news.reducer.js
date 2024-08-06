import { createSlice } from '@reduxjs/toolkit';
import { getNews, getCurrentNews, updateCurrentNews, deleteNews } from '../thunk/news';

const newsReducer = createSlice({
  name: 'news',
  initialState: {
    news: [],
    currentNews: {},
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
      .addCase(getCurrentNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentNews = action.payload;
      })
      .addCase(getCurrentNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateCurrentNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCurrentNews.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateCurrentNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const { updateField } = newsReducer.actions;
export default newsReducer.reducer;
