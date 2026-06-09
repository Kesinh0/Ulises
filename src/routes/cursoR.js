const express = require("express");
const router = express.Router();

const {
	listarCursos,
	buscarCurso,
	registrarCurso,
    registrarInscripcion,
    registrarTarea,
    crearCalificacion,
    verPanelAlumno,
} = require("../controller/cursoController");

router.get("/", listarCursos);
router.get("/:id", buscarCurso);
router.post("/", registrarCurso);
router.post("/:id/inscripciones", registrarInscripcion);
router.post("/:id/tareas", registrarTarea);
router.post("/:id/calificaciones", crearCalificacion);
router.get("/:id/alumnos/:alumnoId/panel", verPanelAlumno);

module.exports = router;