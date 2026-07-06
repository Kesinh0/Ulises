const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuariosController");
const verificarAuth = require("../middlewares/verificarAuth");

//obtener perfil del usuario autenticado
router.get("/perfil", verificarAuth, usuarioController.obtenerPerfil);

//crear un usuario
router.post("/", usuarioController.crearUsuario);

module.exports = router;
