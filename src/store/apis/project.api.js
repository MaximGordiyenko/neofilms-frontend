import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from './base.js';

export const getProjects = createAsyncThunk('data/getProjects', async () => {
  try {
    const response = await baseApi.get('/pages/projects');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProject = createAsyncThunk('data/addProject', async (data, thunkAPI) => {
  try {
    const response = await baseApi.post('/pages/project/create', data);
    if (response.status === 200) {
      thunkAPI.dispatch(getProjects());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const updateProject = createAsyncThunk('data/updateProject', async ({ id, data, thunkAPI }) => {
  try {
    console.log({id, data});
    const response = await baseApi.post(`/pages/project/${id}`, data);
    if (response.status === 200) {
      thunkAPI.dispatch(getProjects());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const getProject = createAsyncThunk('data/getProject', async (project_id) => {
  try {
    const response = await baseApi.get(`/pages/project/${project_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProject = createAsyncThunk('data/deleteProject', async (project_id, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/pages/project/${project_id}`);
    if (response.status === 200) {
      thunkAPI.dispatch(getProjects());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
