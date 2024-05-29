import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as projectApi from '../../../api/project';

export const getProjects = createAsyncThunk('data/getProjects', async () => {
  try {
    const response = await projectApi.getProjects();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProject = createAsyncThunk('data/addProject', async (data, thunkAPI) => {
  try {
    const response = await projectApi.addProject(data);
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
    const response = await projectApi.editProject(id, data);
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
    const response = await projectApi.getProject(project_id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProject = createAsyncThunk('data/deleteProject', async (project_id, thunkAPI) => {
  try {
    const response = await projectApi.deleteProject(project_id);
    if (response.status === 200) {
      thunkAPI.dispatch(getProjects());
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
