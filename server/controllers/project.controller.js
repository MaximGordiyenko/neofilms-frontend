import { ProjectService } from '../services/project.service.js';

export const getProjects = async (req, res, next) => {
  try {
    const getAllProjects = await ProjectService.getProjects();
    return res.status(200).json(getAllProjects);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const [project] = await ProjectService.getProject(project_id);
    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const { id, movie, name, description, completion } = req.body;
    await ProjectService.createProject(id, movie, name, description, completion);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const id = project_id;
    const { movie, name, description, completion } = req.body;
    console.log(id, movie, name, description, completion);
    await ProjectService.updateProject(id, movie, name, description, completion);
    res.status(200).send({ message: 'Project was updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectById = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    await ProjectService.deleteProjectById(project_id);
    res.status(200).send({ message: 'data was deletes' });
  } catch (error) {
    next(error);
  }
};
