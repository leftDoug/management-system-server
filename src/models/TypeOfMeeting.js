// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Agenda = require('./Agenda');
// const Meeting = require('./Meeting');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agenda } from './Agenda.js';
import { Meeting } from './Meeting.js';

export const TypeOfMeeting = sequelize.define(
  'types_of_meetings',
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
    frequency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

TypeOfMeeting.hasMany(Meeting, {
  foreignKey: 'idTypeOfMeeting',
  allowNull: false
});

Meeting.belongsTo(TypeOfMeeting, {
  foreignKey: 'idTypeOfMeeting',
  allowNull: false
});
