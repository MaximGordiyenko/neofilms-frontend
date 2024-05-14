import { DataTypes } from "sequelize";
import { sequelize } from "../DB.js";
import { createSlide } from '../mocks/slide.mock.js';

const tableName = 'slide';

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  movie: {
    type: DataTypes.JSON,
  },
  logo_media: {
    type: DataTypes.JSON,
  },
  logo_text: {
    type: DataTypes.STRING,
  },
  additional_text: {
    type: DataTypes.STRING,
  },
  button_text: {
    type: DataTypes.STRING,
  },
  button_link: {
    type: DataTypes.STRING,
  },
};

const options = {
  timestamps: false,
  freezeTableName: true,
};

export const Slide = sequelize.define(tableName, attributes, options);

// await createSlide();
