// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agenda } from './Agenda.js';

export const Topic = sequelize.define(
  'topic',
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
    month: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idAgenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agendas',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
);
