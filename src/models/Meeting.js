import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agreement } from './Agreement.js';
import { MeetingAttendance } from './MeetingAttendance.js';
import { Worker } from './Worker.js';
import { WorkerMeeting } from './WorkerMeeting.js';

export const Meeting = sequelize.define(
  'meeting',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idTypeOfMeeting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'types_of_meetings',
        key: 'id'
      }
    },
    idSecretary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workers',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
);

Worker.hasMany(Meeting, {
  foreignKey: 'idSecretary',
  allowNull: false
});

Meeting.belongsTo(Worker, {
  foreignKey: 'idSecretary',
  allowNull: false
});

Meeting.belongsToMany(Worker, {
  through: WorkerMeeting,
  foreignKey: 'idMeeting',
  allowNull: false
});

Worker.belongsToMany(Meeting, {
  through: WorkerMeeting,
  foreignKey: 'idWorker',
  allowNull: false
});

Worker.belongsToMany(Meeting, {
  through: MeetingAttendance,
  foreignKey: 'idWorker',
  allowNull: false
});

Meeting.belongsToMany(Worker, {
  through: MeetingAttendance,
  foreignKey: 'idMeeting',
  allowNull: false
});

Meeting.hasMany(Agreement, {
  foreignKey: 'idMeeting',
  allowNull: false
});

Agreement.belongsTo(Meeting, {
  foreignKey: 'idMeeting',
  allowNull: false
});
