const { sendSuccess, sendError } = require("../handlers/responseHandler");
const { vehiculoSchema, updateVehiculoSchema } = require("../validation/vehiculoV");
const vehiculoService = require("../services/vehiculoService");

const crearVehiculo = async (req, res) => {
    try {
        const { error, value } = vehiculoSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const vehiculo = await vehiculoService.crearVehiculo(value);
        return sendSuccess(res, vehiculo, 'Vehículo creado exitosamente', 201);
    } catch (err) {
        console.error(err);
        return sendError(res, 'Error al crear el vehículo', 500);
    }
}

const obtenerVehiculos = async (req, res) => {
    try {
        const vehiculos = await vehiculoService.obtenerVehiculos();
        return sendSuccess(res, vehiculos, 'Vehículos obtenidos exitosamente');
    }
    catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener los vehículos', 500);
    }
}

const obtenerVehiculoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await vehiculoService.obtenerVehiculoPorId(id);
        if (!vehiculo) {
            return sendError(res, 'Vehículo no encontrado', 404);
        }
        return sendSuccess(res, vehiculo, 'Vehículo obtenido exitosamente');
    }
    catch (err) {
        console.error(err);
        return sendError(res, 'Error al obtener el vehículo', 500);
    }
}

const actualizarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updateVehiculoSchema.validate(req.body);
        if (error) {
            return sendError(res, 'Error de validación', 400, error.details.map(e => e.message));
        }
        const vehiculoAct = await vehiculoService.actualizarVehiculo(id, value);
        if (!vehiculoAct) {
            return sendError(res, 'Vehículo no encontrado', 404);
        }
        return sendSuccess(res, vehiculoAct, 'Vehículo actualizado exitosamente');
    } catch (err) {
        console.error(err);
        return sendError(res, 'Error al actualizar el vehículo', 500);
    }
}

const eliminarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculoElim = await vehiculoService.eliminarVehiculo(id);
        if (!vehiculoElim) {
            return sendError(res, 'Vehículo no encontrado', 404);
        }
        return sendSuccess(res, null, 'Vehículo eliminado exitosamente');
    } catch (err) {
        console.error(err);
        return sendError(res, 'Error al eliminar el vehículo', 500);
    }
}

module.exports = {crearVehiculo, obtenerVehiculos, obtenerVehiculoPorId, actualizarVehiculo, eliminarVehiculo};