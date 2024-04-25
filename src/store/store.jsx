import { configureStore } from '@reduxjs/toolkit'
import sliderPageSlice from './sliderPageSlice.jsx';

export const store = configureStore({
  reducer: {
    slider: sliderPageSlice,
  },
})
