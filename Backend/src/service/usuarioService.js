const { QueryFailedError } = require("typeorm");
const bcrypt = require("bcrypt");
const db = require("../conf/db");
const usuario = require("../entities/usuarioE");
const cleanUser = require("../utils/cleanUser");
const usuarioRepository = db.getRepository(usuario);
const { eliminarHorariosPorProfesor } = require("./horarioService");

//crear un usuario para la db
async function crearUsuario(usuarioData) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(
		usuarioData.contrasena,
		saltRounds,
	);

	try {
		const nuevoUsuario = usuarioRepository.create({
			nombre: usuarioData.nombre,
			correo: usuarioData.correo,
			contrasenaHash: hashedPassword,
			rol: usuarioData.rol,
		});

		const savedUsuario = await usuarioRepository.save(nuevoUsuario);

		return cleanUser(savedUsuario);
	} catch (error) {
		if (error instanceof QueryFailedError) {
			if (error.driverError.code === "23505") {
				throw new Error("El correo ya está registrado.");
			}
		}
		throw error;
	}
}

//obtener un usuario por correo
async function obtenerUsuarioPorCorreo(correo) {
	const usuario = await usuarioRepository.findOneBy({ correo });

	if (!usuario) {
		return null; // No se encontró el usuario con el correo proporcionado
	}

	return usuario;
}

//obtener un usuario por id
async function obtenerUsuarioPorId(id) {
	const usuario = await usuarioRepository.findOneBy({ id });

	if (!usuario) {
		return null; // No se encontró el usuario con el id proporcionado
	}

	return cleanUser(usuario);
}

async function obtenerAlumnoPorId(id) {
	const usuario = await usuarioRepository.findOneBy({ id, rol: "alumno" });

	if (!usuario) {
		return null; // No se encontró el usuario con el id proporcionado
	}

	return cleanUser(usuario);
}

async function obtenerProfesorPorId(id) {
	const usuario = await usuarioRepository.findOneBy({ id, rol: "profesor" });

	if (!usuario) {
		return null; // No se encontró el usuario con el id proporcionado
	}

	return cleanUser(usuario);
}

//obtener todos los usuarios
async function obtenerUsuarios() {
	const usuarios = await usuarioRepository.find();

	return usuarios.map((usuario) => cleanUser(usuario));
}

//actualizar un usuario por id
async function actualizarUsuario(id, usuarioData) {
	if (usuarioData.contrasena) {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(
			usuarioData.contrasena,
			saltRounds,
		);
		usuarioData.contrasenaHash = hashedPassword;
		delete usuarioData.contrasena; // Eliminar la propiedad contrasena para no guardarla en la base de datos
	}

	const resultado = await usuarioRepository.update(id, usuarioData);

	if (resultado.affected === 0) {
		return null; // No se encontró el usuario para actualizar
	}

	const usuarioActualizado = await usuarioRepository.findOneBy({ id });

	return cleanUser(usuarioActualizado);
}

//eliminar un usuario por id
async function eliminarUsuario(id) {
	await eliminarHorariosPorProfesor(id); // Eliminar los horarios asociados al profesor antes de eliminar el usuario

	const resultado = await usuarioRepository.delete(id);

	if (resultado.affected === 0) {
		return false; // No se encontró el usuario para eliminar
	}

	return true; // El usuario fue eliminado exitosamente
}

function listarProfesores() {
	return usuarioRepository
		.find({ where: { rol: "profesor" } })
		.then((profesores) => {
			return profesores.map((profesor) => cleanUser(profesor));
		});
}

function listarAlumnos(){
	return usuarioRepository
		.find({ where: { rol: "alumno" } })
		.then((alumnos) => {
			return alumnos.map((alumno) => cleanUser(alumno));
		});
}

module.exports = {
	crearUsuario,
	obtenerUsuarioPorCorreo,
	obtenerUsuarioPorId,
	actualizarUsuario,
	eliminarUsuario,
	obtenerAlumnoPorId,
	obtenerProfesorPorId,
	listarProfesores,
	listarAlumnos,
};
