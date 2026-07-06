const { verificarToken } = require("../service/authService");
const extraerSesion = require("../utils/extraerSesion");

const verificarAuth = async (req, res, next) => {
  const usuario = await extraerSesion(req);

  if (!usuario) {
    return res.status(401).json({ message: "No autorizado" });
  }

  req.usuario = usuario; // Agrega el usuario al objeto de la solicitud
  next();
};

module.exports = verificarAuth;
