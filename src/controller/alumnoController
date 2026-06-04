const { sendSuccess, sendError } = require('../handlers/responseHandler');
const alumnoService = require('../service/alumnoService');
const {alumnoSchema,updateAlumnoSchema} = require('../validation/alumnoV');

const crearAlumno = async (req,res) => {
    try{
        const {error, value} = alumnoSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const alumno = await alumnoService.crearAlumno(value);
        return sendSuccess(res, alumno, 'Alumno creado exitosamente', 201);

    } catch (err) {
        console.error(err);
        return sendError(res, 'Error al crear el alumno', 500);
    }
}

const obtenerAlumnos = async (req,res) => {
    try{
        const alumnos = await alumnoService.obtenerAlumnos();
        return sendSuccess(res, alumnos, 'Alumnos obtenidos exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener los alumnos', 500);
    }
}

const obtenerAlumnoPorId = async (req,res) => {
    try{
        const {id} = req.params;
        const alumno = await alumnoService.obtenerAlumnoPorId(id);
        if (!alumno) {
            return sendError(res, 'Alumno no encontrado', 404);
        }else
            return sendSuccess(res, alumno, 'Alumno obtenido exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener el alumno', 500);
    }
}

const actualizarAlumno = async (req,res) => {
    try{
        const {id} = req.params;
        const {error, value} = updateAlumnoSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const alumnoAct = await alumnoService.actualizarAlumno(id, value);
        if(!alumnoAct){
            return sendError(res, 'Alumno no encontrado', 404);
        }else return sendSuccess(res, alumnoAct, 'Alumno actualizado exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al actualizar el alumno', 500);
    }
}

const eliminarAlumno = async (req,res) => {
    try{
        const {id} = req.params;
        const alumnoElim = await alumnoService.eliminarAlumno(id);
        if(!alumnoElim){
            return sendError(res, 'Alumno no encontrado', 404);
        }else return sendSuccess(res, alumnoElim, 'Alumno eliminado exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al eliminar el alumno', 500);
    }
}

module.exports = {crearAlumno, obtenerAlumnos, obtenerAlumnoPorId, actualizarAlumno, eliminarAlumno};
