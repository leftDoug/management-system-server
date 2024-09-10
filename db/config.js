// const { Client } = require('pg');
require('dotenv').config();
const { Sequelize } = require('sequelize');

// const dbConnection = async () => {
// 	try {
// 		const client = new Client({
// 			host: process.env.DB_HOST,
// 			database: process.env.DB_NAME,
// 			port: process.env.DB_PORT,
// 			user: process.env.DB_USER,
// 			password: process.env.DB_PASSWORD,
// 		});

// 		await client.connect();

// 		console.log('DB connected');
// 	} catch (err) {
// 		console.error(err);
// 		throw new Error('Error de conexión con la BD.');
// 	}
// };

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{ host: process.env.DB_HOST, dialect: 'postgres' }
);

module.exports = db;
