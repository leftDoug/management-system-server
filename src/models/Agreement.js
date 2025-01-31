// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Response = require('./Response');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Response } from './Response.js';

export const Agreement = sequelize.define(
	'agreement',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		number: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		compilance_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

Agreement.hasMany(Response, {
	foreignKey: 'agreement_id',
	targetKey: 'id',
});

Response.belongsTo(Agreement, {
	foreignKey: 'agreement_id',
	sourceKey: 'id',
});

// module.exports = Agreement;
