const { sendSuccess, sendError } = require("../handlers/responseHandler");
const {
	obtenerHorariosPorProfesor,
	crearHorario,
	obtenerHorarioPorId,
	actualizarHorario,
	eliminarHorario,
} = require("../service/horarioService");
const { obtenerProfesorPorId } = require("../service/profesorService");
const {
	horarioSchema,
	updateHorarioSchema,
} = require("../validation/horarioV");

const crearHorarioController = async (req, res) => {
	try {
		const { error, value } = horarioSchema.validate(req.body);
		if (error) {
			return sendError(
				res,
				"Error de validación",
				400,
				error.details.map((e) => e.message),
			);
		}

		const profesor = await obtenerProfesorPorId(value.profesorId);

		if (!profesor) {
			return sendError(res, "Profesor no encontrado", 404);
		}

		const nuevoHorario = await crearHorario(value);
		return sendSuccess(
			res,
			nuevoHorario,
			"Horario creado exitosamente",
			201,
		);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al crear el horario", 500);
	}
};

const obtenerHorariosPorProfesorController = async (req, res) => {
	try {
		const profesorId = parseInt(req.params.profesorId);

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
				error.details.map((e) => e.message),
			);
		}

		if (value.profesorId) {
			const profesor = await obtenerProfesorPorId(value.profesorId);

			if (!profesor) {
				return sendError(res, "Profesor no encontrado", 404);
			}
		}

		const horarioActualizado = await actualizarHorario(id, value);

		if (!horarioActualizado) {
		}

		res.json(horarioActualizado);
	} catch (err) {
		console.error(err);
		return sendError(res, "Error al actualizar el horario", 500);
	}
};

const eliminarHorarioController = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const eliminado = await eliminarHorario(id);

		if (!eliminado) {
			return sendError(res, "Horario no encontrado", 404);
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
	obtenerHorarioPorIdController,
	actualizarHorarioController,
	eliminarHorarioController,
};
