import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCalendars = createAsyncThunk('data/getCalendars', async () => {
  try {
    const response = await axios.get('http://localhost:4001/pages/events');
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const addCalendar = createAsyncThunk('data/addCalendar', async (postData) => {
  try {
    const response = await axios.post('http://localhost:4001/pages/event/create', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateCalendar = createAsyncThunk('data/updateCalendar', async (data) => {
  try {
    const response = await axios.post(`http://localhost:4001/pages/event/update`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getCalendar = createAsyncThunk('data/getCalendar', async (event_id) => {
  try {
    const response = await axios.get(`http://localhost:4001/pages/event/${event_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCalendar = createAsyncThunk('data/deleteCalendar', async (event_id) => {
  try {
    const response = await axios.delete(`http://localhost:4001/pages/event/${event_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
