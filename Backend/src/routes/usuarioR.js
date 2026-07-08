const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuariosController");
const verificarAuth = require("../middlewares/verificarAuth");

//obtener perfil del usuario autenticado
router.get("/perfil", verificarAuth, usuarioController.obtenerPerfil);

//crear un usuario
router.post("/", usuarioController.crearUsuario);

//actualizar un usuario
router.put("/perfil", verificarAuth, usuarioController.actualizarUsuario);

//eliminar un usuario
router.delete("/perfil", verificarAuth, usuarioController.eliminarUsuario);

//listar profesores
router.get("/profesores", usuarioController.listarProfesores);

router.delete(
	"/:id",
	verificarRol("admin"),
	usuarioController.eliminarUsuarioPorId,
);

module.exports = router;
