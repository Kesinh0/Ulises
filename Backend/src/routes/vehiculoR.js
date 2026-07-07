const express = require('express');
const router = express.Router();
const vehiculoController = require('../controller/vehiculoController');

//crear vehiculo
router.post('/', verificarRol("admin"), vehiculoController.crearVehiculo);

//obtener vehiculos
router.get('/', verificarRol("admin"), vehiculoController.obtenerVehiculos);

//obtener un vehiculo por id
router.get('/:id', verificarRol("admin"), vehiculoController.obtenerVehiculoPorId);

//actualizar un vehiculo
router.patch('/:id', verificarRol("admin"), vehiculoController.actualizarVehiculo);

//borrar un vehiculo
router.delete('/:id', verificarRol("admin"), vehiculoController.eliminarVehiculo);

module.exports = router;