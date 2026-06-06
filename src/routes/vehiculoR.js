const express = require('express');
const router = express.Router();
const vehiculoController = require('../controller/vehiculoController');

//crear vehiculo
router.post('/', vehiculoController.crearVehiculo);

//obtener vehiculos
router.get('/', vehiculoController.obtenerVehiculos);

//obtener un vehiculo por id
router.get('/:id', vehiculoController.obtenerVehiculoPorId);

//actualizar un vehiculo
router.patch('/:id', vehiculoController.actualizarVehiculo);

//borrar un vehiculo
router.delete('/:id', vehiculoController.eliminarVehiculo);

module.exports = router;