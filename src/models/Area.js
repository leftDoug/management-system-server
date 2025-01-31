// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Worker = require('./Worker');
// const TypeOfMeeting = require('./TypeOfMeeting');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Worker } from './Worker.js';
import { TypeOfMeeting } from './TypeOfMeeting.js';
import { WorkerArea } from './WorkerArea.js';

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
	through: WorkerArea,
	foreignKey: 'area_id',
	otherKey: 'worker_id',
});

Worker.belongsToMany(Area, {
	through: WorkerArea,
	foreignKey: 'worker_id',
	otherKey: 'area_id',
});

Area.hasMany(TypeOfMeeting, {
	foreignKey: 'area_id',
	sourceKey: 'id',
});

TypeOfMeeting.belongsTo(Area, {
	foreignKey: 'area_id',
	targetKey: 'id',
});

// module.exports = Area;
