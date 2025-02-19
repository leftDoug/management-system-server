import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

import { Agenda } from './Agenda.js';

export const TypeOfMeeting = sequelize.define(
  'typesOfMeetings',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

// model Agenda (idTypeOfMeeting)
TypeOfMeeting.hasMany(Agenda, {
  foreignKey: {
    name: 'idTypeOfMeeting',
    allowNull: false
  }
});

Agenda.belongsTo(TypeOfMeeting, {
  foreignKey: {
    name: 'idTypeOfMeeting',
    allowNull: false
  }
});
