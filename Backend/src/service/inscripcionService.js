const db = require('../conf/db');
const inscripcion = require('../entities/inscripcionE');
const inscripcionRepository = db.getRepository(inscripcion);

const crearInscripcion = async (inscripcionData) => {
    const inscripcion = inscripcionRepository.create(inscripcionData);
    return await inscripcionRepository.save(inscripcion);
}

const obtenerInscripciones = async () => {
    return await inscripcionRepository.find();
}

const obtenerInscripcionPorAlumno = async (alumnoId) => {
    return await inscripcionRepository.findOneBy({alumnoId});
}

const obtenerInscripcionesPorProfesor = async (profesorId) => {
    return await inscripcionRepository.findBy({profesorId});
}

const eliminarInscripcion = async (alumnoId) => {
    const inscripcion = await obtenerInscripcionPorAlumno(alumnoId);
    if (!inscripcion) {
        throw new Error('Inscripción no encontrada');
    }   
    return await inscripcionRepository.remove(inscripcion);
}

module.exports = {crearInscripcion, obtenerInscripciones, obtenerInscripcionPorAlumno, obtenerInscripcionesPorProfesor, eliminarInscripcion};