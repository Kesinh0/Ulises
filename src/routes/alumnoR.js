const express = require('express');
const router = express.Router();
const alumnoController = require('../controller/alumnoController');

//crear alumno
router.post('/', alumnoController.crearAlumno);

//obtener alumnos
router.get('/', alumnoController.obtenerAlumnos);

//obtener un alumno por id
router.get('/:id', alumnoController.obtenerAlumnoPorId);

//actualizar un alumno
router.patch('/:id', alumnoController.actualizarAlumno);

//borrar un alumno
router.delete('/:id', alumnoController.eliminarAlumno);

module.exports = router;