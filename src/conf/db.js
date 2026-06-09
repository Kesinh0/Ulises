const { DataSource } = require("typeorm");
require("dotenv").config();
const alumnoE = require("../entities/alumnoE");
const profesorE = require("../entities/profesorE");
const vehiculoE = require("../entities/vehiculoE");
const horarioE = require("../entities/horarioE");
const cursoE = require("../entities/cursoE");
const inscripcionE = require("../entities/inscripcionE");
const tareaE = require("../entities/tareaE");
const calificacionE = require("../entities/calificacionE");

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "DarkFlame555-",
	database: process.env.DB_NAME || "req",
	synchronize: true,
	logging: false,
	entities: [alumnoE, profesorE, vehiculoE, horarioE, cursoE, inscripcionE, tareaE, calificacionE],
});

module.exports = AppDataSource;
