const cors = require('cors');
const express = require('express');
const db = require('./db/config');
const Worker = require('./models/Worker');
const Role = require('./models/Role');
const { dbConnection } = require('./db/config');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// create express application/server
const app = express();

// database connection
dbConnection();

// public directory
app.use(express.static('public'));

// CORS
app.use(cors());

// boby lecture and parsing
app.use(express.json());

// swagger configuration
// OpenAPI definition
const options = {
	definition: {
		openapi: '3.0.0', // Specification version
		info: {
			// API metadata
			title: 'FevexMeet API', // API title
			version: '1.0.0',
		}, // API metadata
		servers: [
			{
				// API servers
				url: `http://localhost:${process.env.PORT}`, // API server URL
				description: 'FevexMeet API Server', // API server description
			},
		], // API servers
	}, // API definition
	apis: ['./routes/*.js'],
};

// swagger configuration
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/areas', require('./routes/areas.routes'));
app.use('/api/workers', require('./routes/workers.routes'));
app.use('/api/types-of-meetings', require('./routes/type-of-meeting.routes'));
app.use('/api/roles', require('./routes/roles.routes'));

app.listen(process.env.PORT, () => {
	console.log(`running server in port ${process.env.PORT}`);
});
