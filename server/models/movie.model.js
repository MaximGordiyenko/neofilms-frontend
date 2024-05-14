import { DataTypes } from "sequelize";
import { sequelize } from "../DB.js";
import { createMovie } from '../mocks/movie.mock.js';

const tableName = 'movie';

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  movie: {
    type: DataTypes.JSON,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  movie_link: {
    type: DataTypes.STRING,
  },
  release_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  },
  directed_by: {
    type: DataTypes.JSONB
  },
  written_by: {
    type: DataTypes.JSONB
  },
  starring: {
    type: DataTypes.JSONB
  },
};

const options = {
  timestamps: false,
  freezeTableName: true,
};

export const Movie = sequelize.define(tableName, attributes, options);

// await createMovie();
