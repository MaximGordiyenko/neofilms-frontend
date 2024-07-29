import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import auth from './reducers/auth.reducer.js';
import admin from './reducers/admin.reducer.js';
import news from './reducers/news.reducer.js';
import movie from './reducers/movie.reducer.js';
import project from './reducers/project.reducer.js';
import calendar from './reducers/calendar.reducer.js';
import casting from './reducers/casting.reducer.js';

export const store = configureStore({
  reducer: { auth, admin, news, movie, project, calendar, casting },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
