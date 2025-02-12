import { DataTypes } from 'sequelize';
import { sequelize } from '../db/config.js';

export const WorkerMeeting = sequelize.define(
  'workers_meetings',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idMeeting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meetings',
        key: 'id'
      }
    },
    idWorker: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workers',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
