import { Project } from "../models/project.model.js";

export const createProject = async () => {
  try {
    await Project.sync({ force: true });
    await Project.bulkCreate([
      {
        "id": "10cdfea0-783c-4d64-956b-4fdfb7ww37f1",
        "movie": {
          "lastModified": 1715079981000,
          "name": "Screenshot 2024-05-07 at 14.06.17.png",
          "path": "Screenshot 2024-05-07 at 14.06.17.png",
          "size": 26444,
          "type": "image/png",
          "webkitRelativePath": ""
        },
        "name": "Hello movie",
        "description": "Lorem impus dolor set",
        "completion": 33
      }
    ]);
    console.log(`${Project.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
