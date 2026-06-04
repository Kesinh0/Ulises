const db = require('../conf/db');
const alumno = require('../entities/alumnoE');
const alumnoRepository = db.getRepository(alumno);

//crea un alumno para la db
const crearAlumno = async (alumnoData) => {
    const alumno = alumnoRepository.create(alumnoData);
    return await alumnoRepository.save(alumno);
}

const obtenerAlumnos = async () => {
    return await alumnoRepository.find();
}

const obtenerAlumnoPorId = async (id) => {
    return await alumnoRepository.findOneBy({id});
}
    
const actualizarAlumno = async (id, alumnoData) => {
    const alumno = obtenerAlumnoPorId(id);
    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }else{
        alumnoRepository.merge(alumno, alumnoData);
        return await alumnoRepository.save(alumno);
    }
}

const eliminarAlumno = async (id) => {
    const alumno = obtenerAlumnoPorId(id);
    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }else{
        return await alumnoRepository.remove(alumno);
    }
}

module.exports = {crearAlumno, obtenerAlumnos, obtenerAlumnoPorId, actualizarAlumno, eliminarAlumno};