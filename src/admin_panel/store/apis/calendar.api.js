import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as eventApi from '../../../api/event';

export const getCalendars = createAsyncThunk('data/getCalendars', async () => {
  try {
    const response = await eventApi.getEvents();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addCalendar = createAsyncThunk('data/addCalendar', async (data, thunkAPI) => {
  try {
    const response = await eventApi.addEvent(data.name, data.date, data.description);
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
    const response = await eventApi.editEvent(id, data.name, data.date, data.description);
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
    const response = await eventApi.getEvent(event_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCalendar = createAsyncThunk('data/deleteCalendar', async (event_id, thunkAPI) => {
  try {
    const response = await eventApi.deleteEvent(event_id);
    if (response.status === 200) {
      thunkAPI.dispatch(getCalendars());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
