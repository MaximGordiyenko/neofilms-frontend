import { createSlice } from '@reduxjs/toolkit';
import { getMovies, addMovie, getMovie, deleteMovie, updateMovie } from '../thunk/movie.api.js';

const movieReducer = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    movie: {},
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
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const { updateField } = movieReducer.actions;
export default movieReducer.reducer;
