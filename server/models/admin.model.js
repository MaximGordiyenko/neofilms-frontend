import { DataTypes } from 'sequelize';
import { sequelize } from '../DB.js';
import { createAdmin } from '../mocks/admin.mock.js';

const tableName = 'admin';

const attributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.TEXT,
  },
  
};

const options = {
  timestamps: false,
  freezeTableName: true,
};

export const AdminModel = sequelize.define(tableName, attributes, options);

// await createAdmin();
