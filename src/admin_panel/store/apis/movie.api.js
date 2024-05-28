import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as movieApi from '../../../api/movie';

export const getMovies = createAsyncThunk('data/getMovies', async () => {
  try {
    const response = await movieApi.getMovies();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getMovie = createAsyncThunk('data/getMovie', async (movie_id) => {
  try {
    const response = await movieApi.getMovie(movie_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addMovie = createAsyncThunk('data/addMovie', async (data, thunkAPI) => {
  try {
    const response = await movieApi.addMovie(data);
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
    const response = await movieApi.editMovie(id, data);
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
    const response = await movieApi.deleteMovie(movie_id);
    if (response.status === 200) {
      thunkAPI.dispatch(getMovies());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
