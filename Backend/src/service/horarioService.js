const { LessThanOrEqual, MoreThanOrEqual } = require("typeorm");
const db = require("../conf/db");
const horario = require("../entities/horarioE");
const horarioRepository = db.getRepository(horario);

//crear un horario para la db
const crearHorario = async (horarioData) => {
  const horarioExistente = await horarioRepository.findOne({
    where: {
      profesorId: horarioData.profesorId,
      dia: horarioData.dia,
      horaInicio: LessThanOrEqual(horarioData.horaFin),
      horaFin: MoreThanOrEqual(horarioData.horaInicio),
    },
  });

  if (horarioExistente) {
    throw new Error("El horario se superpone con otro existente");
  }

  const horario = horarioRepository.create(horarioData);
  return horarioRepository.save(horario);
};

const obtenerHorariosPorProfesor = async (profesorId) => {
  return horarioRepository.find({ where: { profesorId } });
};

const obtenerHorarioPorId = async (id) => {
  return horarioRepository.findOneBy({ id });
};

const actualizarHorario = async (id, horarioData) => {
  const horarioExistente = await horarioRepository.findOne({
    where: {
      profesorId: horarioData.profesorId,
      dia: horarioData.dia,
      horaInicio: LessThanOrEqual(horarioData.horaFin),
      horaFin: MoreThanOrEqual(horarioData.horaInicio),
    },
  });

  if (horarioExistente) {
    throw new Error("El horario se superpone con otro existente");
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
