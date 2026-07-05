const express = require("express");
const router = express.Router();
const horarioController = require("../controller/horarioController");

//crear horario
router.post("/", horarioController.crearHorarioController);

//obtener horarios por profesor
router.get(
	"/profesor/:profesorId",
	horarioController.obtenerHorariosPorProfesorController,
);

//obtener un horario por id
router.get("/:id", horarioController.obtenerHorarioPorIdController);

//actualizar un horario
router.patch("/:id", horarioController.actualizarHorarioController);

//borrar un horario
router.delete("/:id", horarioController.eliminarHorarioController);

module.exports = router;
