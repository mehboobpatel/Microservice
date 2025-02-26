// tslint:disable no-console
import { DatabaseValues } from './database';
import { config } from 'dotenv';
export const getDBFromEnv = (): DatabaseValues => {
  config();
  if (typeof process.env.DB_NAME !== 'string') {
    console.log('DB_NAME is not set in environment');
    process.exit(1);
  }
  if (typeof process.env.DB_USERNAME !== 'string') {
    console.log('DB_USERNAME is not set in environment');
    process.exit(1);
  }
  if (typeof process.env.DB_PASSWORD !== 'string') {
    console.log('DB_PASSWORD is not set in environment');
    process.exit(1);
  }
  if (typeof process.env.DB_SERVER !== 'string') {
    console.log('DB_SERVER is not set in environment');
    process.exit(1);
  }

  const port = typeof process.env.DB_PORT === 'string' ? parseInt(process.env.DB_PORT, 10) : 5432;

  return {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_SERVER,
    port,
  };
};
