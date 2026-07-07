const { sendSuccess, sendError } = require("../handlers/responseHandler");
const {
	obtenerHorariosPorProfesor,
	crearHorario,
	obtenerHorarioPorId,
	actualizarHorario,
	eliminarHorario,
} = require("../service/horarioService");
const { obtenerProfesorPorId } = require("../service/usuarioService");
const {
	horarioSchema,
	updateHorarioSchema,
} = require("../validation/horarioV");
const { obtenerVehiculoPorId } = require("../service/vehiculoService");

const crearHorarioController = async (req, res) => {
	try {
		const { error, value } = horarioSchema.validate(req.body);
		if (error) {
			return sendError(
				res,
				"Error de validación",
				400,
				error.details[0].message,
			);
		}

		const vehiculo = await obtenerVehiculoPorId(value.vehiculoId);
		if (!vehiculo) {
			return sendError(res, "Vehículo no encontrado", 404);
		}

		const nuevoHorario = await crearHorario({
			...value, // Data del horario a crear
			usuarioId: req.usuario.id, // ID del usuario autenticado
		});
		return sendSuccess(
			res,
			nuevoHorario,
			"Horario creado exitosamente",
			201,
		);
	} catch (err) {
		if (
			err.message === "El horario se superpone con otro existente" ||
			err.message ===
				"El horario se superpone con otro existente para el vehículo"
		) {
			return sendError(res, err.message, 400);
		}

		console.error(err);
		return sendError(res, "Error al crear el horario", 500);
	}
};

const obtenerHorariosDelProfesorController = async (req, res) => {
	try {
		const profesorId = req.usuario.id; // ID del profesor autenticado

		const horarios = await obtenerHorariosPorProfesor(profesorId);

		return sendSuccess(res, horarios, "Horarios obtenidos exitosamente");
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al obtener los horarios", 500);
	}
};

const obtenerHorariosPorProfesorController = async (req, res) => {
	try {
		const profesorId = req.params.usuarioId;

		const profesor = await obtenerProfesorPorId(profesorId);

		if (!profesor) {
			return sendError(res, "Profesor no encontrado", 404);
		}

		const horarios = await obtenerHorariosPorProfesor(profesorId);

		return sendSuccess(res, horarios, "Horarios obtenidos exitosamente");
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al obtener los horarios", 500);
	}
};

const obtenerHorarioPorIdController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const horario = await obtenerHorarioPorId(id);

		if (!horario) {
			return sendError(res, "Horario no encontrado", 404);
		}

		res.json(horario);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al obtener el horario", 500);
	}
};

const actualizarHorarioController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { error, value } = updateHorarioSchema.validate(req.body);

		if (error) {
			return sendError(
				res,
				"Error de validación",
				400,
				error.details[0].message,
			);
		}

		const horarioExistente = await obtenerHorarioPorId(id);

		if (!horarioExistente) {
			return sendError(res, "Horario no encontrado", 404);
		}

		// Verificar si el horario pertenece al profesor autenticado
		if (horarioExistente.usuarioId !== req.usuario.id) {
			return sendError(res, "Acceso denegado", 403);
		}

		if (value.vehiculoId) {
			const vehiculo = await obtenerVehiculoPorId(value.vehiculoId);
			if (!vehiculo) {
				return sendError(res, "Vehículo no encontrado", 404);
			}
		}

		const horarioActualizado = await actualizarHorario(id, value);

		res.json(horarioActualizado);
	} catch (err) {
		if (
			err.message === "El horario se superpone con otro existente" ||
			err.message ===
				"El horario se superpone con otro existente para el vehículo"
		) {
			return sendError(res, err.message, 400);
		}

		console.error(err);
		return sendError(res, "Error al actualizar el horario", 500);
	}
};

const eliminarHorarioController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const horarioExistente = await obtenerHorarioPorId(id);

		if (!horarioExistente) {
			return sendError(res, "Horario no encontrado", 404);
		}

		// Verificar si el horario pertenece al profesor autenticado
		if (horarioExistente.usuarioId !== req.usuario.id) {
			return sendError(res, "Acceso denegado", 403);
		}

		const eliminado = await eliminarHorario(id);

		if (!eliminado) {
			return sendError(res, "Error al eliminar el horario", 500);
		}

		return sendSuccess(res, null, "Horario eliminado exitosamente");
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al eliminar el horario", 500);
	}
};

module.exports = {
	crearHorarioController,
	obtenerHorariosPorProfesorController,
	obtenerHorariosDelProfesorController,
	obtenerHorarioPorIdController,
	actualizarHorarioController,
	eliminarHorarioController,
};
