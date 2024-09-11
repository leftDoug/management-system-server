const { DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Agenda = require('./Agenda');
const Meeting = require('./Meeting');

const TypeOfMeeting = db.define(
	'types_of_meeting',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		frequency: {
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

TypeOfMeeting.hasOne(Agenda, {
	foreignKey: 'idTypeOfMeeting',
	sourceKey: 'id',
});

Agenda.belongsTo(TypeOfMeeting, {
	foreignKey: 'idTypeOfMeeting',
	targetKey: 'id',
});

TypeOfMeeting.hasMany(Meeting, {
	foreignKey: 'idTypeOfMeeting',
	sourceKey: 'id',
});

Meeting.belongsTo(TypeOfMeeting, {
	foreignKey: 'idTypeOfMeeting',
	targetKey: 'id',
});

module.exports = TypeOfMeeting;
