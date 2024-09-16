import { createAsyncThunk } from '@reduxjs/toolkit';
import * as newsApi from '../../../api/short_news';
import * as castingApi from '../../../api/casting';
import { getCastings } from './casting.api';
import { deleteShortNews } from '../../../api/short_news';

export const getNews = createAsyncThunk('data/getNews', async () => {
  try {
    const response = await newsApi.getShortNewsList();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getCurrentNews = createAsyncThunk('data/getCurrentNew', async (movie_id) => {
  try {
    const response = await newsApi.getShortNews(movie_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateCurrentNews = createAsyncThunk('data/updateCurrentNew', async ({ id, data, thunkAPI }) => {
  try {
    const response = await newsApi.editShortNews(id, data.image_name, data.description, data.date);
    if (response.status === 200) {
      thunkAPI.dispatch(getNews());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const deleteNews = createAsyncThunk('data/deleteNews', async (news_id, thunkAPI) => {
  const response = await newsApi.deleteShortNews(news_id);
  if (response.status === 200) {
    thunkAPI.dispatch(getNews());
    return response.data;
  }
});
