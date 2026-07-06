const express = require("express");
const router = express.Router();
const horarioController = require("../controller/horarioController");
const verificarRol = require("../middlewares/verificarRol");

//crear horario
router.post(
  "/",
  verificarRol("profesor"),
  horarioController.crearHorarioController,
);

//obtener todos los horarios del profesor autenticado
router.get(
  "/",
  verificarRol("profesor"),
  horarioController.obtenerHorariosDelProfesorController,
);

//obtener horarios por profesor
router.get(
  "/profesor/:profesorId",
  horarioController.obtenerHorariosPorProfesorController,
);

//obtener un horario por id
router.get("/:id", horarioController.obtenerHorarioPorIdController);

//actualizar un horario
router.patch(
  "/:id",
  verificarRol("profesor"),
  horarioController.actualizarHorarioController,
);

//eliminar un horario
router.delete(
  "/:id",
  verificarRol("profesor"),
  horarioController.eliminarHorarioController,
);

module.exports = router;
