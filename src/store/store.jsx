import { configureStore } from '@reduxjs/toolkit';
import authSlicer from './reducers/auth.reducer.js';
import adminSlicer from './reducers/admin.reducer.js';
import sliderPageSlice from './reducers/slide.reducer.js';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    auth: authSlicer,
    admin: adminSlicer,
    slide: sliderPageSlice
  }
});
