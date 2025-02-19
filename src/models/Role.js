import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
