// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Response = require('./Response');

import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Response } from './Response.js';

export const Agreement = sequelize.define(
  'agreement',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.literal(
        "to_char(current_timestamp, 'YYYYMMDDHH24MISSMS')"
      ),
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    compilanceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Agreement.hasMany(Response, {
  foreignKey: 'idAgreement',
  targetKey: 'id'
});

Response.belongsTo(Agreement, {
  foreignKey: 'idAgreement',
  sourceKey: 'id'
});

// module.exports = Agreement;
