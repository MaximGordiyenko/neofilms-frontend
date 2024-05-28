import { createSlice } from '@reduxjs/toolkit';
import { getCalendars, addCalendar, updateCalendar, deleteCalendar, getCalendar } from '../apis/calendar.api.js';

const calendarReducer = createSlice({
  name: 'calendar',
  initialState: {
    calendars: [],
    calendar: {},
    status: 'idle',
    error: null
  },
  reducers: {
    updateField(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCalendars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.calendars = action.payload;
      })
      .addCase(getCalendars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addCalendar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCalendar.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateCalendar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCalendar.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getCalendar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.calendar = action.payload;
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteCalendar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCalendar.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCalendar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
    
  }
});

export const { updateField } = calendarReducer.actions;
export default calendarReducer.reducer;
