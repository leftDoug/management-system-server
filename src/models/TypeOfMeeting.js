// const { DataTypes } = require('sequelize');
// const { db } = require('../src/controllers/db/config');
// const Agenda = require('./Agenda');
// const Meeting = require('./Meeting');

import { DataTypes } from 'sequelize';

import { sequelize } from '../db/config.js';
import { Agenda } from './Agenda.js';
import { Meeting } from './Meeting.js';

export const TypeOfMeeting = sequelize.define(
	'types_of_meetings',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
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
	foreignKey: 'type_of_meeting_id',
	sourceKey: 'id',
});

Agenda.belongsTo(TypeOfMeeting, {
	foreignKey: 'type_of_meeting_id',
	targetKey: 'id',
});

TypeOfMeeting.hasMany(Meeting, {
	foreignKey: 'type_of_meeting_id',
	sourceKey: 'id',
});

Meeting.belongsTo(TypeOfMeeting, {
	foreignKey: 'type_of_meeting_id',
	targetKey: 'id',
});

// module.exports = TypeOfMeeting;
