// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const Response = sequelize.define(
	'response',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

// module.exports = Response;
