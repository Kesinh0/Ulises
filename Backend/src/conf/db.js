const { DataSource } = require("typeorm");
require("dotenv").config();
const usuarioE = require("../entities/usuarioE");
const vehiculoE = require("../entities/vehiculoE");
const horarioE = require("../entities/horarioE");
const inscripcionE = require("../entities/inscripcionE");

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "Lostilos1206!",
	database: process.env.DB_NAME || "req",
	synchronize: true,
	logging: false,
	entities: [vehiculoE, horarioE, inscripcionE, usuarioE],
});

module.exports = AppDataSource;
