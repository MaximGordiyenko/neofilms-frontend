import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from './base.js';

export const getCalendars = createAsyncThunk('data/getCalendars', async () => {
  try {
    const response = await baseApi.get('/pages/events');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addCalendar = createAsyncThunk('data/addCalendar', async (data, thunkAPI) => {
  try {
    const response = await baseApi.post('/pages/event/create', data);
    if (response.status === 200) {
      thunkAPI.dispatch(getCalendars());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const updateCalendar = createAsyncThunk('data/updateCalendar', async ({ id, data, thunkAPI }) => {
  try {
    const response = await baseApi.post(`/pages/event/${id}`, data);
    if (response.status === 200) {
      thunkAPI.dispatch(getCalendars());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const getCalendar = createAsyncThunk('data/getCalendar', async (event_id) => {
  try {
    const response = await baseApi.get(`/pages/event/${event_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCalendar = createAsyncThunk('data/deleteCalendar', async (event_id, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/pages/event/${event_id}`);
    if (response.status === 200) {
      thunkAPI.dispatch(getCalendars());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
