const { DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Agreement = require('./Agreement');

const Meeting = db.define(
	'meeting',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		startTime: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		endTime: {
			type: DataTypes.TIME,
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

module.exports = Meeting;
