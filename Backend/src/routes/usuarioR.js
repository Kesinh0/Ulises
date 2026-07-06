const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuariosController");

//crear un usuario
router.post("/", usuarioController.crearUsuario);

module.exports = router;
