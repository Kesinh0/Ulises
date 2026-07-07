const express = require("express");
const router = express.Router();
const inscripcionController = require('../controller/inscripcionController');


router.post("/", verificarRol("alumno"), inscripcionController.crearInscripcion);

router.get("/usuario/:id",verificarRol("profesor"), inscripcionController.obtenerInscripcionesPorProfesor);

router.get("/usuario/:id", verificarRol("alumno"), inscripcionController.obtenerInscripcionPorAlumno);

router.delete("/usuario/:id", verificarRol("alumno"), inscripcionController.eliminarInscripcion);

module.exports = router;