import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjects = createAsyncThunk('data/getProjects', async () => {
  try {
    const response = await axios.get('http://localhost:4001/pages/projects');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProject = createAsyncThunk('data/addProject', async (postData) => {
  try {
    const response = await axios.post('http://localhost:4001/pages/project/create', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getProject = createAsyncThunk('data/getProject', async (project_id) => {
  try {
    const response = await axios.get(`http://localhost:4001/pages/project/${project_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProject = createAsyncThunk('data/deleteProject', async (project_id) => {
  try {
    const response = await axios.delete(`http://localhost:4001/pages/project/${project_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
