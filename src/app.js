import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import areasRoutes from './routes/areas.routes.js';
import authRoutes from './routes/auth.routes.js';
import workersRoutes from './routes/workers.routes.js';
import typesOfMeetingsRoutes from './routes/types-of-meetings.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import agendasRoutes from './routes/agendas.routes.js';
import meetingsRoutes from './routes/meetings.routes.js';
import responsesRoutes from './routes/responses.routes.js';
import agreementsRoutes from './routes/agreements.routes.js';
import topicsRoutes from './routes/topics.routes.js';

// create express application/server
const app = express();

// CORS
app.use(cors());

// boby lecture and parsing
app.use(express.json());

// OpenAPI definition fof swagger
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'FevexMeet API',
			version: '1.0.0',
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}`,
				description: 'FevexMeet API Server',
			},
		],
	},
	apis: ['./routes/*.js'],
};

// swagger setup
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/workers', workersRoutes);
app.use('/api/types-of-meetings', typesOfMeetingsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/agendas', agendasRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/responses', responsesRoutes);
app.use('/api/agreements', agreementsRoutes);
app.use('/api/topics', topicsRoutes);

export default app;
