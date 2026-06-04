const { DataSource } = require('typeorm');
require('dotenv').config();
const alumnoE = require('../entities/alumnoE');
const profesorE = require('../entities/profesorE');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'req',
  synchronize: true,
  logging: false,
  entities: [alumnoE, profesorE],
});

module.exports = AppDataSource;