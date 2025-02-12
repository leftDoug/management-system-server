import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agreement } from './Agreement.js';
import { Meeting } from './Meeting.js';
import { User } from './User.js';
import { MeetingAttendance } from './MeetingAttendance.js';
import { WorkerMeeting } from './WorkerMeeting.js';

export const Worker = sequelize.define(
  'worker',
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
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false
  }
);

Worker.hasOne(User, {
  foreignKey: 'idUser',
  sourceKey: 'id'
});

User.belongsTo(Worker, {
  foreignKey: 'idUser',
  targetKey: 'id'
});

// Worker.hasMany(Meeting, {
//   foreignKey: 'idSecretary',
//   allowNull: false
// });

// Meeting.belongsTo(Worker, {
//   foreignKey: 'idSecretary',
//   allowNull: false
// });

// Worker.belongsToMany(Meeting, {
//   through: WorkerMeeting,
//   foreignKey: 'idWorker',
//   allowNull: false
// });

// Meeting.belongsToMany(Worker, {
//   through: WorkerMeeting,
//   foreignKey: 'idMeeting',
//   allowNull: false
// });

// Worker.belongsToMany(Meeting, {
//   through: MeetingAttendance,
//   foreignKey: 'idWorker'
// });

// Meeting.belongsToMany(Worker, {
//   through: MeetingAttendance,
//   foreignKey: 'idMeeting'
// });

Worker.hasMany(Agreement, {
  foreignKey: 'idResponsible',
  sourceKey: 'id'
});

Agreement.belongsTo(Worker, {
  foreignKey: 'idResponsible',
  targetId: 'id'
});
