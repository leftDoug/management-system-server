// const cors = require('cors');

// const express = require('express');

// const swaggerJSDoc = require('swagger-jsdoc');

// const swaggerUi = require('swagger-ui-express');

// require('dotenv').config();
import dotenv from 'dotenv';

import { sequelize } from './db/config.js';
import app from './app.js';
import { Agreement } from './models/Agreement.js';
import { Area } from './models/Area.js';
import { TypeOfMeeting } from './models/TypeOfMeeting.js';
import { Agenda } from './models/Agenda.js';
import { Topic } from './models/Topic.js';
import { WorkerMeeting } from './models/WorkerMeeting.js';
import { Meeting } from './models/Meeting.js';
import { Worker } from './models/Worker.js';
import { WorkerArea } from './models/WorkerArea.js';
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
    // await sequelize.sync({ force: true });
    // await User.sync({ alter: true });
    // await Meeting.sync({ alter: true });
    // await Worker.sync({ alter: true });
    // await WorkerArea.sync({ alter: true });
    // await WorkerMeeting.sync({ alter: true });

    console.log('Connection has been established successfully');

    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
