const { sendSuccess, sendError } = require("../handlers/responseHandler");
const inscripcionService = require("../service/inscripcionService");
const {
	inscripcionSchema,
	updateInscripcionSchema,
} = require("../validation/inscripcionV");
const { obtenerAlumnoPorId } = require("../service/usuarioService");
const { obtenerProfesorPorId } = require("../service/usuarioService");

const crearInscripcion = async (req, res) => {
	try {
		const { error, value } = inscripcionSchema.validate(req.body);
		if (error) {
			return sendError(
				res,
				"Error de validación",
				400,
				error.details.map((e) => e.message),
			);
		}
		const alumno = req.usuario;
		const profesor = await obtenerProfesorPorId(value.profesorId);
		if (!alumno) {
			return sendError(res, "Alumno no encontrado", 400);
		}
		if (!profesor) {
			return sendError(res, "Profesor no encontrado", 400);
		}

		const inscripcionExiste =
			await inscripcionService.obtenerInscripcionPorAlumno(
				value.alumnoId,
			);
		if (inscripcionExiste) {
			return sendError(res, "El alumno ya tiene una inscripción", 400);
		}

		const inscripcion = await inscripcionService.crearInscripcion(value);
		return sendSuccess(
			res,
			inscripcion,
			"Inscripción creada exitosamente",
			201,
		);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al crear la inscripción", 500);
	}
};

const obtenerInscripcionesPorProfesor = async (req, res) => {
	try {
		const { profesorId } = req.params;
		const inscripciones =
			await inscripcionService.obtenerInscripcionesPorProfesor(
				profesorId,
			);
		return sendSuccess(
			res,
			inscripciones,
			"Inscripciones obtenidas exitosamente",
		);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al obtener las inscripciones", 500);
	}
};

const obtenerInscripcionPorAlumno = async (req, res) => {
	try {
		const alumnoId = req.usuario.id;
		const inscripcion =
			await inscripcionService.obtenerInscripcionPorAlumno(alumnoId);
		if (!inscripcion) {
			return sendError(res, "Inscripción no encontrada", 404);
		} else
			return sendSuccess(
				res,
				inscripcion,
				"Inscripción obtenida exitosamente",
			);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al obtener la inscripción", 500);
	}
};

const eliminarInscripcion = async (req, res) => {
	try {
		const  alumnoId = req.usuario.id;
		await inscripcionService.eliminarInscripcion(alumnoId);
		return sendSuccess(res, null, "Inscripción eliminada exitosamente");
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al eliminar la inscripción", 500);
	}
};

module.exports = {
	crearInscripcion,
	obtenerInscripcionesPorProfesor,
	obtenerInscripcionPorAlumno,
	eliminarInscripcion,
};
