require("reflect-metadata");
const AppDataSource = require("./db");
const alumno = require("../entities/alumnoE");
const profesor = require("../entities/profesorE");
const vehiculo = require("../entities/vehiculoE");

const initialSetup = async () => {
	try {
		await AppDataSource.initialize();

		await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "citext";');

		console.log("se conecta");
		await AppDataSource.synchronize(true);
		console.log("se sincroniza");
		const alumnoRepo = AppDataSource.getRepository(alumno);
		const profesorRepo = AppDataSource.getRepository(profesor);
		const vehiculoRepo = AppDataSource.getRepository(vehiculo);
		const alumnoCount = await alumnoRepo.count();
		const profesorCount = await profesorRepo.count();
		const vehiculoCount = await vehiculoRepo.count();
		console.log(`Alumnos: ${alumnoCount}`);
		console.log(`Profesores: ${profesorCount}`);
		console.log(`Vehículos: ${vehiculoCount}`);
		if (alumnoCount === 0) {
			const alumno1 = alumnoRepo.create({
				nombre: "Juan",
				apellido: "Pérez",
			});
			const alumno2 = alumnoRepo.create({
				nombre: "María",
				apellido: "Gómez",
			});
			await alumnoRepo.save([alumno1, alumno2]);
			console.log("Alumnos hechos");
		}
		if (profesorCount === 0) {
			const profesor1 = profesorRepo.create({
				nombre: "Carlos",
				apellido: "Santana",
				categoria: "practico",
			});
			const profesor2 = profesorRepo.create({
				nombre: "Jimmy",
				apellido: "Page",
				categoria: "teorico",
			});
			await profesorRepo.save([profesor1, profesor2]);
			console.log("Profesores hechos");
		}
		if (vehiculoCount === 0) {
			const vehiculo1 = vehiculoRepo.create({
				marca: "Toyota",
				modelo: "Corolla",
				anio: 2020,
				estado: "disponible",
				enMantenimiento: false,
			});
			const vehiculo2 = vehiculoRepo.create({
				marca: "Honda",
				modelo: "Civic",
				anio: 2021,
				estado: "ocupado",
				enMantenimiento: false,
			});
			await vehiculoRepo.save([vehiculo1, vehiculo2]);
			console.log("Vehículos hechos");
		}
		console.log("exito");
		process.exit(0);
	} catch (err) {
		console.error("Causa de suicidio:", err);
		process.exit(1);
	}
};

initialSetup();
