// const cors = require('cors');

// const express = require('express');

// const swaggerJSDoc = require('swagger-jsdoc');

// const swaggerUi = require('swagger-ui-express');

// require('dotenv').config();
import dotenv from 'dotenv';

import { sequelize } from './db/config.js';
import app from './app.js';
import { Role } from './models/Role.js';
import { User } from './models/User.js';

dotenv.config();

// const { dbConnection } = require('./src/db/config');

// create express application/server
// const app = express();

// database connection
// dbConnection();

// public directory
// app.use(express.static('public'));

// CORS
// app.use(cors());

// boby lecture and parsing
// app.use(express.json());

// OpenAPI definition fof swagger
// const options = {
// 	definition: {
// 		openapi: '3.0.0',
// 		info: {
// 			title: 'FevexMeet API',
// 			version: '1.0.0',
// 		},
// 		servers: [
// 			{
// 				url: `http://localhost:${process.env.PORT}`,
// 				description: 'FevexMeet API Server',
// 			},
// 		],
// 	},
// 	apis: ['./routes/*.js'],
// };

// // swagger setup
// const swaggerSpec = swaggerJSDoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
// app.use('/api/auth', require('./routes/auth.routes.js'));
// app.use('/api/areas', require('./routes/areas.routes.js'));
// app.use('/api/workers', require('./routes/workers.routes.js'));
// app.use(
// 	'/api/types-of-meetings',
// 	require('./routes/types-of-meetings.routes.js')
// );
// app.use('/api/roles', require('./routes/roles.routes.js'));

// run server

async function main() {
	try {
		await sequelize.sync({ force: false });

		console.log('Connection has been established successfully');

		app.listen(process.env.PORT, () => {
			console.log(`Server is listening on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

main();
