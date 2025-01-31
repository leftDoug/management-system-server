import { sequelize } from '../db/config.js';

export const WorkerArea = sequelize.define(
	'workers_areas',
	{},
	{
		timestamps: false,
	}
);
