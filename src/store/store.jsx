import { configureStore } from '@reduxjs/toolkit'
import sliderPageSlice from './sliderPageSlice.js';
import authSlicer from './reducers/Auth.reducer.js';
import adminSlicer from './reducers/admin.reducer.js';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authSlicer,
    admin: adminSlicer,
    slide: sliderPageSlice,
  },
})
