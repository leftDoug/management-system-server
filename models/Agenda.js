const { DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Topic = require('./Topic');

const Agenda = db.define(
	'agenda',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		year: {
			type: DataTypes.INTEGER,
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

Agenda.hasMany(Topic, {
	foreignKey: 'idAgenda',
	sourceKey: 'id',
});

Topic.belongsTo(Agenda, {
	foreignKey: 'idAgenda',
	targetKey: 'id',
});

module.exports = Agenda;
