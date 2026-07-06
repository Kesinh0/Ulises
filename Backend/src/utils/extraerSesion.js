const { verificarToken } = require("../service/authService");

const extraerSesion = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; // Token no proporcionado
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuario = await verificarToken(token);
    return usuario; // Retorna el usuario extraído del token
  } catch (error) {
    return null; // Token inválido
  }
};

module.exports = extraerSesion;
