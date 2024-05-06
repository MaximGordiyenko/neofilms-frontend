import { configureStore } from '@reduxjs/toolkit'
import sliderPageSlice from './sliderPageSlice.js';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    slide: sliderPageSlice,
  },
})
