import dotenv from 'dotenv';
import pc from 'picocolors';

import app from './app.js';
import { sequelize } from './db/config.js';
import { createViews } from './db/views.js';
import { createFunctions } from './db/functions.js';

dotenv.config();

async function dbConnection() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    await createViews();
    await createFunctions();

    console.log(
      pc.green(pc.bold('Connection has been established successfully'))
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

await dbConnection();

export const server = app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(
    pc.green(pc.bold(`Server is listening on port ${process.env.PORT}`))
  );
});
