import { Project } from '../models/project.model.js';

export const ProjectService = (() => {
  
  const getProjects = async () => {
    return await Project.findAll();
  };
  
  const getProject = async (project_id) => {
    return await Project.findAll({
      where: {
        id: project_id
      }
    });
  };
  
  const createProject = async (id, movie, name, description, completion) => {
    await Project.create({
      "id": id,
      "movie": {
        "lastModified": movie.lastModified || 1715079981000,
        "name": movie.name || "Screenshot 2024-05-07 at 14.06.17.png",
        "path": movie.path || "Screenshot 2024-05-07 at 14.06.17.png",
        "size": movie.size || 26444,
        "type": movie.type || "image/png",
        "webkitRelativePath": ""
      },
      "name": name || "This is next one logo text",
      "description": description || "This is next one additional logo text",
      "completion": completion || 33
    });
  };
  
  const updateProject = async (id, movie, name, description, completion) => {
    return await Project.update({ movie, name, description, completion }, {
      where: {
        id: id
      }
    });
  };
  
  const deleteProjectById = async (project_id) => {
    const deletedCount = await Project.destroy({
      where: {
        id: project_id
      }
    });
    
    if (deletedCount === 0) {
      return { success: false, message: 'Project not found' };
    }
    
    return { success: true, message: 'Project deleted successfully' };
  };
  
  return {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProjectById
  };
})();
