import express from 'express';
import { getProjects, getProject, addProject, updateProject, deleteProjectById } from '../controllers/project.controller.js';

const router = express.Router();

router.get('/pages/projects', getProjects);
router.get('/pages/project/:project_id', getProject);

router.post('/pages/project/create', addProject);
router.post('/pages/project/:project_id', updateProject);

router.delete('/pages/project/:project_id', deleteProjectById);

export default router;
