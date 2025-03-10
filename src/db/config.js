import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_TEST_NAME, DB_USER, DB_PASSWORD, DB_HOST, NODE_ENV } =
  process.env;

export const sequelize =
  NODE_ENV === 'test'
    ? new Sequelize(DB_TEST_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres'
      })
    : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres'
      });
