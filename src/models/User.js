// const { Model, DataTypes } = require('sequelize');
// const db = require('../db/config');

// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';

export const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'El usuario es requerido',
				},
				isAlphanumeric: {
					msg: 'El usuario solo puede contener letras y numeros',
				},
				len: {
					args: [5, 8],
					msg: 'El usuario debe tener entre 5 y 8 caracteres',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{ timestamps: false }
);

// module.exports = User;
