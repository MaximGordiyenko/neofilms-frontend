import { DataTypes } from "sequelize";
import { sequelize } from "../DB.js";
import { createProject } from '../mocks/project.mock.js';

const tableName = 'project';

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  movie: {
    type: DataTypes.JSON,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  completion: {
    type: DataTypes.INTEGER,
  },
};

const options = {
  timestamps: false,
  freezeTableName: true,
};

export const Project = sequelize.define(tableName, attributes, options);

// await createProject();
