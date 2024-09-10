const { DataTypes } = require('sequelize');
const db = require('../db/config');

const Role = db.define(
	'role',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
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

// Area.belongsToMany(Worker, {
// 	through: 'workers_areas',
// });

// Worker.belongsToMany(Area, {
// 	through: 'workers_areas',
// });

// Area.hasMany(TypeOfMeeting, {
// 	foreignKey: 'idArea',
// 	sourceKey: 'id',
// });

// TypeOfMeeting.belongsTo(Area, {
// 	foreignKey: 'idArea',
// 	targetKey: 'id',
// });

module.exports = Role;
