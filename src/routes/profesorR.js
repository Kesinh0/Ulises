const express = require('express');
const router = express.Router();
const profesorController = require('../controller/profesorController');

//crear profesor
router.post('/', profesorController.crearProfesor);

//obtener profesores
router.get('/', profesorController.obtenerProfesores);

//obtener un profesor por id
router.get('/:id', profesorController.obtenerProfesorPorId);

//actualizar un profesor
router.patch('/:id', profesorController.actualizarProfesor);

//borrar un profesor
router.delete('/:id', profesorController.eliminarProfesor);

module.exports = router;