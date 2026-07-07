const { LessThanOrEqual, MoreThanOrEqual, Equal, Not } = require("typeorm");
const db = require("../conf/db");
const horario = require("../entities/horarioE");
const horarioRepository = db.getRepository(horario);

const obtenerHorariosVehiculo = async (vehiculoId) => {
	return horarioRepository.find({ where: { vehiculoId } });
};

//crear un horario para la db
const crearHorario = async (horarioData) => {
	const horarioExistente = await horarioRepository.findOne({
		where: {
			usuarioId: horarioData.usuarioId,
			dia: horarioData.dia,
			horaInicio: LessThanOrEqual(horarioData.horaFin),
			horaFin: MoreThanOrEqual(horarioData.horaInicio),
		},
	});

	// Aquí puede haber race conditions
	if (horarioExistente) {
		throw new Error("El horario se superpone con otro existente");
	}

	const horariosVehiculo = await obtenerHorariosVehiculo(
		horarioData.vehiculoId,
	);
	const seSuperponeConVehiculo = horariosVehiculo.some(
		(horarioVehiculo) =>
			horarioVehiculo.dia === horarioData.dia &&
			horarioVehiculo.horaInicio <= horarioData.horaFin &&
			horarioVehiculo.horaFin >= horarioData.horaInicio,
	);

	if (seSuperponeConVehiculo) {
		throw new Error(
			"El horario se superpone con otro existente para el vehículo",
		);
	}

	const horario = horarioRepository.create(horarioData);
	return horarioRepository.save(horario);
};

const obtenerHorariosPorProfesor = async (profesorId) => {
	return horarioRepository.find({ where: { usuarioId: profesorId } });
};

const obtenerHorarioPorId = async (id) => {
	return horarioRepository.findOneBy({ id });
};

const actualizarHorario = async (id, horarioData) => {
	const horarioExistente = await horarioRepository.findOne({
		where: {
			usuarioId: horarioData.usuarioId,
			dia: horarioData.dia,
			id: Not(Equal(id)), // Excluir el horario que se está actualizando
			horaInicio: LessThanOrEqual(horarioData.horaFin),
			horaFin: MoreThanOrEqual(horarioData.horaInicio),
		},
	});

	if (horarioExistente) {
		throw new Error("El horario se superpone con otro existente");
	}

	if (horarioData.vehiculoId) {
		const horariosVehiculo = await obtenerHorariosVehiculo(
			horarioData.vehiculoId,
		);
		const seSuperponeConVehiculo = horariosVehiculo.some(
			(horarioVehiculo) =>
				horarioVehiculo.id !== id && // Excluir el horario que se está actualizando
				horarioVehiculo.dia === horarioData.dia &&
				horarioVehiculo.horaInicio <= horarioData.horaFin &&
				horarioVehiculo.horaFin >= horarioData.horaInicio,
		);

		if (seSuperponeConVehiculo) {
			throw new Error(
				"El horario se superpone con otro existente para el vehículo",
			);
		}
	}

	const resultado = await horarioRepository.update(id, horarioData);

	if (resultado.affected === 0) {
		return null; // No se encontró el horario para actualizar
	}

	return obtenerHorarioPorId(id); // Devuelve el horario actualizado
};

const eliminarHorario = async (id) => {
	const resultado = await horarioRepository.delete(id);

	if (resultado.affected === 0) {
		return false; // No se encontró el horario para eliminar
	}

	return true; // El horario fue eliminado exitosamente
};

module.exports = {
	crearHorario,
	obtenerHorariosPorProfesor,
	obtenerHorarioPorId,
	actualizarHorario,
	eliminarHorario,
};
