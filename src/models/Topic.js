import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const Topic = sequelize.define(
  'topic',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export const getTopicModel = () => {
  return Topic;
};
