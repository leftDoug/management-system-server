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
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{
		timestamps: false,
	}
);

Agenda.hasMany(Topic, {
	foreignKey: 'idAgenda',
	sourceKey: 'id',
});

Topic.belongsTo(Agenda, {
	foreignKey: 'idAgenda',
	targetKey: 'id',
});

// module.exports = Agenda;
