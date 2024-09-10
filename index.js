const cors = require('cors');
const express = require('express');
const db = require('./db/config');
const Worker = require('./models/Worker');
const Role = require('./models/Role');
require('dotenv').config();

// create express application/server
const app = express();

// public directory
app.use(express.static('public'));

// CORS
app.use(cors());

// boby lecture and parsing
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/areas', require('./routes/areas.routes'));
app.use('/api/workers', require('./routes/workers.routes'));
app.use('/api/types-of-meetings', require('./routes/type-of-meeting.routes'));
app.use('/api/roles', require('./routes/roles.routes'));

app.listen(process.env.PORT, () => {
	console.log(`running server in port ${process.env.PORT}`);

	// database connection
	const dbConnection = async () => {
		try {
			db.sync({ force: false });
			// Role.sync();

			console.log('DB connected');
		} catch (err) {
			console.error(err);

			throw new Error('Error en la conexión con la BD');
		}
	};

	dbConnection();
});
