// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { User } from './User.js';

export const Role = sequelize.define(
	'role',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

Role.hasOne(User, {
	foreignKey: 'idRole',
	sourceKey: 'id',
});

User.belongsTo(Role, {
	foreignKey: 'idRole',
	targetKey: 'id',
});

// module.exports = Role;
