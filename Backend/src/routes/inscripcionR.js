const express = require("express");
const router = express.Router();
const inscripcionController = require("../controller/inscripcionController");
const verificarRol = require("../middlewares/verificarRol");

router.post(
	"/",
	verificarRol("alumno"),
	inscripcionController.crearInscripcion,
);

router.get(
	"/profesor",
	verificarRol("profesor"),
	inscripcionController.obtenerInscripcionesPorProfesor,
);

router.get(
	"/alumno",
	verificarRol("alumno"),
	inscripcionController.obtenerInscripcionPorAlumno,
);

router.delete(
	"/usuario/:id",
	verificarRol("alumno"),
	inscripcionController.eliminarInscripcion,
);

module.exports = router;
