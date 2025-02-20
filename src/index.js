import dotenv from 'dotenv';

import app from './app.js';
import { sequelize } from './db/config.js';

dotenv.config();

async function main() {
  try {
    // await sequelize.sync({ force: true });

    console.log('Connection has been established successfully');

    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
