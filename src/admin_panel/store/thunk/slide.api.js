import { createAsyncThunk } from '@reduxjs/toolkit';
import * as slideApi from '../../../api/slide';

export const getSlides = createAsyncThunk('data/getSlides', async () => {
  try {
    const response = await slideApi.getSlides();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getSlide = createAsyncThunk('data/getSlide', async (slide_id) => {
  try {
    const response = await slideApi.getSlide(slide_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addSlide = createAsyncThunk('data/addSlide', async (data, thunkAPI) => {
  try {
    const response = await slideApi.addSlide(data);
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
    const response = await slideApi.editSlide(id, data);
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
    const response = await slideApi.deleteSlide(slide_id);
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
    const response = await slideApi.getMedia(slide_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getLogoOfSlide = createAsyncThunk('data/logoSlide', async (slide_id) => {
  try {
    const response = await slideApi.getLogo(slide_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});
