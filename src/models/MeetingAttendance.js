import { sequelize } from '../db/config.js';

export const MeetingAttendance = sequelize.define(
  'meetings_attendance',
  {},
  {
    timestamps: false,
    freezeTableName: true
  }
);
