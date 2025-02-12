import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agenda } from './Agenda.js';
import { TypeOfMeeting } from './TypeOfMeeting.js';
import { Worker } from './Worker.js';
import { WorkerArea } from './WorkerArea.js';

export const Area = sequelize.define(
  'area',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
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

Area.belongsToMany(Worker, {
  through: WorkerArea,
  foreignKey: 'idArea',
  allowNull: false
});

Worker.belongsToMany(Area, {
  through: WorkerArea,
  foreignKey: 'idWorker',
  allowNull: false
});

Area.hasMany(TypeOfMeeting, {
  foreignKey: 'idArea',
  sourceKey: 'id'
});

TypeOfMeeting.belongsTo(Area, {
  foreignKey: 'idArea',
  targetKey: 'id'
});

Area.hasOne(Agenda, {
  foreignKey: 'idArea',
  sourceKey: 'id'
});

Agenda.belongsTo(Area, {
  foreignKey: 'idArea',
  targetKey: 'id'
});

// module.exports = Area;
