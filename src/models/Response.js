import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const Response = sequelize.define(
  'response',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export const getResponseModel = () => {
  return Response;
};
