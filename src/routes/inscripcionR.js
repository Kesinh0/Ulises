const express = require("express");
const router = express.Router();
const inscripcionController = require('../controller/inscripcionController');


router.post("/", inscripcionController.crearInscripcion);

router.get("/profesor/:profesorId", inscripcionController.obtenerInscripcionesPorProfesor);

router.get("/alumno/:alumnoId", inscripcionController.obtenerInscripcionPorAlumno);

router.delete("/alumno/:alumnoId", inscripcionController.eliminarInscripcion);

module.exports = router;