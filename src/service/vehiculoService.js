const db = require('../conf/db');
const vehiculo = require('../entities/vehiculoE');
const vehiculoRepository = db.getRepository(vehiculo);

//crear un vehiculo para la db
const crearVehiculo = async (vehiculoData) => {
    const vehiculo = vehiculoRepository.create(vehiculoData);
    return await vehiculoRepository.save(vehiculo);
}

const obtenerVehiculos = async () => {
    return await vehiculoRepository.find();
}

const obtenerVehiculoPorId = async (id) => {
    return await vehiculoRepository.findOneBy({id});
}

const actualizarVehiculo = async (id, vehiculoData) => {
    const vehiculo = obtenerVehiculoPorId(id);
    if (!vehiculo) {
        throw new Error('Vehiculo no encontrado');
    }
    vehiculoRepository.merge(vehiculo, vehiculoData);
    return await vehiculoRepository.save(vehiculo);
}   

const eliminarVehiculo = async (id) => {
    const vehiculo = obtenerVehiculoPorId(id);
    if (!vehiculo) {
        throw new Error('Vehiculo no encontrado');
    }   
    return await vehiculoRepository.remove(vehiculo);
}

module.exports = {crearVehiculo, obtenerVehiculos, obtenerVehiculoPorId, actualizarVehiculo, eliminarVehiculo};
