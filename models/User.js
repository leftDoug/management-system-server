// const { Model, DataTypes } = require('sequelize');
// const db = require('../db/config');

const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const User = db.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		state: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{ timestamps: false }
);

module.exports = User;
