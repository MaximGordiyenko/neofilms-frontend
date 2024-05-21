import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCalendars = createAsyncThunk('data/getCalendars', async () => {
  try {
    const response = await axios.get('/pages/events', { withCredentials: "include" });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addCalendar = createAsyncThunk('data/addCalendar', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/pages/event/create', data, { withCredentials: "include" });
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
    const response = await axios.post(`/pages/event/${id}`, data, { withCredentials: "include" });
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
    const response = await axios.get(`/pages/event/${event_id}`, { withCredentials: "include" });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCalendar = createAsyncThunk('data/deleteCalendar', async (event_id, thunkAPI) => {
  try {
    const response = await axios.delete(`/pages/event/${event_id}`, { withCredentials: "include" });
    if (response.status === 200) {
      thunkAPI.dispatch(getCalendars());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
