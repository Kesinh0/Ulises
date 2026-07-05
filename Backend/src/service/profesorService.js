const db = require('../conf/db');
const profesor = require('../entities/profesorE');
const profesorRepository = db.getRepository(profesor);

//crea un profesor para la db
const crearProfesor = async (profesorData) => {
    const profesor = profesorRepository.create(profesorData);
    return await profesorRepository.save(profesor);
}

const obtenerProfesores = async () => {
    return await profesorRepository.find();
}

const obtenerProfesorPorId = async (id) => {
    return await profesorRepository.findOneBy({id});
}
    
const actualizarProfesor = async (id, profesorData) => {
    const profesor = obtenerProfesorPorId(id);
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }else{
        profesorRepository.merge(profesor, profesorData);
        return await profesorRepository.save(profesor);
    }
}

const eliminarProfesor = async (id) => {
    const profesor = obtenerProfesorPorId(id);
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }else{
        return await profesorRepository.remove(profesor);
    }
}

module.exports = {crearProfesor, obtenerProfesores, obtenerProfesorPorId, actualizarProfesor, eliminarProfesor};