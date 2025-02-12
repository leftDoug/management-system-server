// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Topic = require('./Topic');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Topic } from './Topic.js';

export const Agenda = sequelize.define(
  'agenda',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    year: {
      type: DataTypes.DATEONLY,
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

Agenda.hasMany(Topic, {
  foreignKey: 'idAgenda',
  allowNull: false
});

Topic.belongsTo(Agenda, {
  foreignKey: 'idAgenda',
  allowNull: false
});
