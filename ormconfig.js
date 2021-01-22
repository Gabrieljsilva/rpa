// load enviroment variables
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrations: [
    path.resolve(
      __dirname,
      'dist',
      'shared',
      'database',
      'migrations',
      '*.{js,ts}',
    ),
  ],
  entities: [
    path.resolve(
      __dirname,
      'dist',
      'shared',
      'database',
      'entities',
      '*.{js,ts}',
    ),
  ],
  subscribers: [
    path.resolve(
      __dirname,
      'dist',
      'shared',
      'database',
      'subscribers',
      '*.{js,ts}',
    ),
  ],
  synchronize: false,
  cli: {
    entitiesDir: 'src/shared/database/entities',
    migrationsDir: 'src/shared/database/migrations',
    subscribersDir: 'src/shared/database/subscribers',
  },
};
