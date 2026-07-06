const extraerSesion = require("../utils/extraerSesion");

const verificarRol = (rol) => {
  return async (req, res, next) => {
    const usuario = await extraerSesion(req);

    if (!usuario) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (usuario.rol !== rol) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    req.usuario = usuario; // Agrega el usuario al objeto de la solicitud
    next();
  };
};

module.exports = verificarRol;
