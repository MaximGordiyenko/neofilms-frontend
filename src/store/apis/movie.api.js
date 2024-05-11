import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMovies = createAsyncThunk('data/getMovies', async () => {
  try {
    const response = await axios.get('http://localhost:4001/pages/movies');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addMovie = createAsyncThunk('data/addMovie', async (postData) => {
  try {
    const response = await axios.post('http://localhost:4001/pages/movie/create', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getMovie = createAsyncThunk('data/getMovie', async (movie_id) => {
  try {
    const response = await axios.get(`http://localhost:4001/pages/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteMovie = createAsyncThunk('data/deleteMovie', async (movie_id) => {
  try {
    const response = await axios.delete(`http://localhost:4001/pages/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
