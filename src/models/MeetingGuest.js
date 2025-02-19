import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const MeetingGuest = sequelize.define(
  'meetingsGuests',
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
    idGuest: {
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
