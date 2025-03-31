import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

import { Topic } from './Topic.js';

export const Agenda = sequelize.define(
  'agenda',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: DataTypes.INTEGER,
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

export const getAgendaModel = () => {
  return Agenda;
};

// // model Topic (idAgenda)
// Agenda.hasMany(Topic, {
//   foreignKey: {
//     name: 'idAgenda',
//     allowNull: false
//   }
// });

// Topic.belongsTo(Agenda, {
//   foreignKey: {
//     name: 'idAgenda',
//     allowNull: false
//   }
// });
