import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSlides = createAsyncThunk('data/getSlides', async () => {
  try {
    const response = await axios.get('http://localhost:4001/pages/slides');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addSlide = createAsyncThunk('data/addSlide', async (postData) => {
  try {
    const response = await axios.post('http://localhost:4001/pages/slide', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateSlide = createAsyncThunk('data/updateSlide', async (postData) => {
  const response = await axios.post('http://localhost:4001/pages/slide/:slide_id', postData);
  return response.data;
});

export const getMediaOfSlide = createAsyncThunk('data/mediaSlide', async (slide_id) => {
  const response = await axios.get(`http://localhost:4001/pages/slide/${slide_id}/movie`);
  return response.data;
});

const sliderPageSlice = createSlice({
  name: 'slide',
  initialState: {
    data: [],
    mediaUrl: '',
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
      .addCase(getSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSlide.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSlide.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getMediaOfSlide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMediaOfSlide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mediaUrl = action.payload;
      })
      .addCase(getMediaOfSlide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
    
  }
});

export const { updateField } = sliderPageSlice.actions;
export default sliderPageSlice.reducer;
