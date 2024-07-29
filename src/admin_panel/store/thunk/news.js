import { createAsyncThunk } from '@reduxjs/toolkit';
import * as newsApi from '../../../api/short_news';

export const getNews = createAsyncThunk('data/getNews', async () => {
  try {
    const response = await newsApi.getShortNewsList();
    return response.data;
  } catch (error) {
    throw error;
  }
});
