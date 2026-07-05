const { sendSuccess, sendError } = require('../handlers/responseHandler');
const profesorService = require('../service/profesorService');
const {profesorSchema,updateProfesorSchema} = require('../validation/profesorV');

const crearProfesor = async (req,res) => {
    try{
        const {error, value} = profesorSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const profesor = await profesorService.crearProfesor(value);
        return sendSuccess(res, profesor, 'Profesor creado exitosamente', 201);

    } catch(err) {
        console.error(err);
        return sendError(res, 'Error al crear el profesor', 500);
    }
}

const obtenerProfesores = async (req,res) => {
    try{
        const profesores = await profesorService.obtenerProfesores();
        return sendSuccess(res, profesores, 'Profesores obtenidos exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener los profesores', 500);
    }
}

const obtenerProfesorPorId = async (req,res) => {
    try{
        const {id} = req.params;
        const profesor = await profesorService.obtenerProfesorPorId(id);
        if (!profesor) {
            return sendError(res, 'Profesor no encontrado', 404);
        }else
            return sendSuccess(res, profesor, 'Profesor obtenido exitosamente');
    }catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener el profesor', 500);
    }
}

const actualizarProfesor = async (req,res) => {
    try{
        const {id} = req.params;
        const {error, value} = updateProfesorSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const profesorAct = await profesorService.actualizarProfesor(id, value);
        if(!profesorAct){
            return sendError(res, 'Profesor no encontrado', 404);
        }else return sendSuccess(res, profesorAct, 'Profesor actualizado exitosamente');
    }catch(err) {
        console.error(err);
        return sendError(res, 'Error al actualizar el profesor', 500);
    }
}

const eliminarProfesor = async (req,res) => {
    try{
        const {id} = req.params;
        const profesorElim = await profesorService.eliminarProfesor(id);
        if(!profesorElim){
            return sendError(res, 'Profesor no encontrado', 404);
        }else return sendSuccess(res, profesorElim, 'Profesor eliminado exitosamente');
    }catch(err) {
        console.error(err);
        return sendError(res, 'Error al eliminar el profesor', 500);
    }
}

module.exports = {crearProfesor, obtenerProfesores, obtenerProfesorPorId, actualizarProfesor, eliminarProfesor};