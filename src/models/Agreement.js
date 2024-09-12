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
		compilanceDate: {
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
	foreignKey: 'idAgreement',
	targetKey: 'id',
});

Response.belongsTo(Agreement, {
	foreignKey: 'idAgreement',
	sourceKey: 'id',
});

// module.exports = Agreement;
