import { DataTypes } from "sequelize";
import { sequelize } from "../DB.js";
import { createCalendar } from '../mocks/calendar.mock.js';

const tableName = 'calendar';

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
};

const options = {
  timestamps: false,
  freezeTableName: true,
};

export const Calendar = sequelize.define(tableName, attributes, options);

// await createCalendar();
