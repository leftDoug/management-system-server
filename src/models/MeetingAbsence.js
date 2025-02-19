import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const MeetingAbsence = sequelize.define(
  'meetingsAbsences',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idMeeting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meetings',
        key: 'id'
      }
    },
    idAbsent: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
