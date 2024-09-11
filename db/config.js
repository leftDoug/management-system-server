// const { Client } = require('pg');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{ host: process.env.DB_HOST, dialect: 'postgres' }
);

const dbConnection = async () => {
	try {
		db.sync({ force: false });

		console.log('DB connected');
	} catch (error) {
		console.error(error);

		throw new Error('Error en la conexión con la BD');
	}
};

module.exports = {
	db,
	dbConnection,
};
