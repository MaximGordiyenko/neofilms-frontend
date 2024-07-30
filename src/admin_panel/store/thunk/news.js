import { createAsyncThunk } from '@reduxjs/toolkit';
import * as newsApi from '../../../api/short_news';
import * as projectApi from '../../../api/project';
import { getProjects } from './project.api';
import { editShortNews } from '../../../api/short_news';

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
  console.log(id, data);
  try {
    const response = await newsApi.editShortNews(id, data.image, data.description, data.date);
    if (response.status === 200) {
      thunkAPI.dispatch(getNews());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
