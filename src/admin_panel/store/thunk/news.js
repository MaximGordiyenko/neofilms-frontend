import { createAsyncThunk } from '@reduxjs/toolkit';
import * as newsApi from '../../../api/news';

export const getNews = createAsyncThunk('data/getNews', async () => {
  try {
    const response = await newsApi.getNews();
    return response.data;
  } catch (error) {
    throw error;
  }
});
