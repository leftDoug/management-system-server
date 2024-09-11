const { DataTypes } = require('sequelize');
const { db } = require('../db/config');
const User = require('./User');
const Meeting = require('./Meeting');
const Agreement = require('./Agreement');

const Worker = db.define(
	'worker',
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
		occupation: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		secretary: {
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

Worker.hasOne(User, {
	foreignKey: 'idWorker',
	sourceKey: 'id',
});

User.belongsTo(Worker, {
	foreignKey: 'idWorker',
	targetKey: 'id',
});

Worker.hasMany(Meeting, {
	foreignKey: 'idResponsible',
	sourceKey: 'id',
});

Meeting.belongsTo(Worker, {
	foreignKey: 'idResponsible',
	targetKey: 'id',
});

Worker.hasMany(Agreement, {
	foreignKey: 'idResponsible',
	sourceKey: 'id',
});

Agreement.belongsTo(Worker, {
	foreignKey: 'idResponsible',
	targetKey: 'id',
});

module.exports = Worker;
