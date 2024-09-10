const { DataTypes } = require('sequelize');
const db = require('../db/config');
const Worker = require('./Worker');
const TypeOfMeeting = require('./TypeOfMeeting');

const Area = db.define(
	'area',
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

Area.belongsToMany(Worker, {
	through: 'workers_areas',
});

Worker.belongsToMany(Area, {
	through: 'workers_areas',
});

Area.hasMany(TypeOfMeeting, {
	foreignKey: 'idArea',
	sourceKey: 'id',
});

TypeOfMeeting.belongsTo(Area, {
	foreignKey: 'idArea',
	targetKey: 'id',
});

module.exports = Area;
