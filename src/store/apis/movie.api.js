import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from './base.js';

export const getMovies = createAsyncThunk('data/getMovies', async () => {
  try {
    const response = await baseApi.get('/pages/movies');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getMovie = createAsyncThunk('data/getMovie', async (movie_id) => {
  try {
    const response = await baseApi.get(`/pages/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addMovie = createAsyncThunk('data/addMovie', async (data, thunkAPI) => {
  try {
    const response = await baseApi.post('/pages/movie/create', data);
    if (response.status === 200) {
      thunkAPI.dispatch(getMovies());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const updateMovie = createAsyncThunk('data/updateMovie', async ({ id, data, thunkAPI }) => {
  try {
    const response = await baseApi.post(`/pages/movie/${id}`, data);
    if (response.status === 200) {
      thunkAPI.dispatch(getMovie());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const deleteMovie = createAsyncThunk('data/deleteMovie', async (movie_id, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/pages/movie/${movie_id}`);
    if (response.status === 200) {
      thunkAPI.dispatch(getMovies());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
