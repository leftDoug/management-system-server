const { DataTypes } = require('sequelize');
const db = require('../db/config');
const Response = require('./Response');

const Agreement = db.define(
	'agreement',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		compilance_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
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

Agreement.hasMany(Response, {
	foreignKey: 'idAgreement',
	targetKey: 'id',
});

Response.belongsTo(Agreement, {
	foreignKey: 'idAgreement',
	sourceKey: 'id',
});

module.exports = Agreement;
