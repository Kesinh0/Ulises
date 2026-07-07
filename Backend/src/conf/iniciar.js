require("reflect-metadata");
const bcrypt = require("bcrypt");

const AppDataSource = require("./db");
const vehiculo = require("../entities/vehiculoE");
const usuario = require("../entities/usuarioE");

const initialSetup = async () => {
	try {
		await AppDataSource.initialize();

		await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS "citext";');

		console.log("se conecta");
		await AppDataSource.synchronize(true);
		console.log("se sincroniza");
		const vehiculoRepo = AppDataSource.getRepository(vehiculo);
		const vehiculoCount = await vehiculoRepo.count();
		console.log(`Vehículos: ${vehiculoCount}`);
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

			const adminPassword = "admin123";
			const hashedPassword = await bcrypt.hash(adminPassword, 10);

			const usuarioRepo = AppDataSource.getRepository(usuario);
			const adminUsuario = usuarioRepo.create({
				nombre: "Admin",
				correo: "admin@example.com",
				contrasenaHash: hashedPassword,
				rol: "admin",
			});
			await usuarioRepo.save([adminUsuario]);
			console.log("Usuario admin creado");
		}
		console.log("exito");
		process.exit(0);
	} catch (err) {
		console.error("Causa de suicidio:", err);
		process.exit(1);
	}
};

initialSetup();
