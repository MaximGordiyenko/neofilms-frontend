import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSlides = createAsyncThunk('data/getSlides', async () => {
  try {
    const response = await axios.get('http://localhost:4001/pages/slides');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getSlide = createAsyncThunk('data/getSlide', async (slide_id) => {
  try {
    const response = await axios.get(`http://localhost:4001/pages/slide/${slide_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addSlide = createAsyncThunk('data/addSlide', async (data, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4001/pages/slide/create', data);
    if (response.status === 200) {
      thunkAPI.dispatch(getSlides());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const updateSlide = createAsyncThunk('data/updateSlide', async ({ id, data, thunkAPI }) => {
  try {
    const response = await axios.post(`http://localhost:4001/pages/slide/${id}`, data);
    if (response.status === 200) {
      thunkAPI.dispatch(getSlides());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const deleteSlide = createAsyncThunk('data/deleteSlide', async (slide_id, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:4001/pages/slide/${slide_id}`);
    if (response.status === 200) {
      thunkAPI.dispatch(getSlides());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const getMediaOfSlide = createAsyncThunk('data/mediaSlide', async (slide_id) => {
  try {
    const response = await axios.get(`http://localhost:4001/pages/slide/${slide_id}/movie`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
