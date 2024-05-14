import { createSlice } from '@reduxjs/toolkit';
import { getProjects, addProject, getProject, deleteProject, updateProject } from '../apis/project.api.js';

const projectReducer = createSlice({
  name: 'movie',
  initialState: {
    projects: [],
    project: {},
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
      .addCase(getProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(addProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProject.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(getProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      });
  }
});

export const { updateField } = projectReducer.actions;
export default projectReducer.reducer;
