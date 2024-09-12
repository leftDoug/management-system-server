// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const Topic = sequelize.define(
	'topic',
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
		month: {
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

// module.exports = Topic;
