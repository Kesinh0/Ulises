const { verificarToken } = require("../service/authService");

const verificarAuth = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ mensaje: "Token no proporcionado" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const usuario = await verificarToken(token);
		req.usuario = usuario; // Agregar el usuario al objeto de solicitud
		next();
	} catch (error) {
		return res.status(401).json({ mensaje: "Token inválido" });
	}
};

module.exports = verificarAuth;
