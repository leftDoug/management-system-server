// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Agreement = require('./Agreement');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agreement } from './Agreement.js';

export const Meeting = sequelize.define(
	'meeting',
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
		session: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		startTime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		endTime: {
			type: DataTypes.DATE,
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

Meeting.hasMany(Agreement, {
	foreignKey: 'idMeeting',
	sourceKey: 'id',
});

Agreement.belongsTo(Meeting, {
	foreignKey: 'idMeeting',
	targetKey: 'id',
});

// module.exports = Meeting;
