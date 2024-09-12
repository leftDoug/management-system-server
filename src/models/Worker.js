// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const User = require('./User');
// const Meeting = require('./Meeting');
// const Agreement = require('./Agreement');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { User } from './User.js';
import { Meeting } from './Meeting.js';
import { Agreement } from './Agreement.js';

export const Worker = sequelize.define(
	'worker',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		occupation: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
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

Worker.hasOne(User, {
	foreignKey: 'idWorker',
	sourceKey: 'id',
});

User.belongsTo(Worker, {
	foreignKey: 'idWorker',
	targetKey: 'id',
});

Worker.hasMany(Meeting, {
	foreignKey: 'idResponsible',
	sourceKey: 'id',
});

Meeting.belongsTo(Worker, {
	foreignKey: 'idResponsible',
	targetKey: 'id',
});

Worker.hasMany(Meeting, {
	foreignKey: 'idSecretary',
	sourceKey: 'id',
});

Meeting.belongsTo(Worker, {
	foreignKey: 'idSecretary',
	targetKey: 'id',
});

Worker.hasMany(Agreement, {
	foreignKey: 'idResponsible',
	sourceKey: 'id',
});

Agreement.belongsTo(Worker, {
	foreignKey: 'idResponsible',
	targetKey: 'id',
});

// module.exports = Worker;
