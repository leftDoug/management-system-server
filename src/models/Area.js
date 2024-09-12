// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Worker = require('./Worker');
// const TypeOfMeeting = require('./TypeOfMeeting');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Worker } from './Worker.js';
import { TypeOfMeeting } from './TypeOfMeeting.js';

export const Area = sequelize.define(
	'area',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
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

Area.belongsToMany(Worker, {
	through: 'workers_areas',
});

Worker.belongsToMany(Area, {
	through: 'workers_areas',
});

Area.hasMany(TypeOfMeeting, {
	foreignKey: 'idArea',
	sourceKey: 'id',
});

TypeOfMeeting.belongsTo(Area, {
	foreignKey: 'idArea',
	targetKey: 'id',
});

// module.exports = Area;
