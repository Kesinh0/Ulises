const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	obtenerUsuarioPorCorreo,
	obtenerUsuarioPorId,
} = require("../service/usuarioService");

const login = async (correo, contrasena) => {
	const usuario = await obtenerUsuarioPorCorreo(correo);

	if (!usuario) {
		throw new Error("Credenciales inválidas");
	}

	const contrasenaValida = await bcrypt.compare(
		contrasena,
		usuario.contrasenaHash,
	);

	if (!contrasenaValida) {
		throw new Error("Credenciales inválidas");
	}

	const token = jwt.sign(
		{ id: usuario.id, correo: usuario.correo },
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		},
	);

	return { token };
};

const verificarToken = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await obtenerUsuarioPorId(decoded.id);

		if (!usuario) {
			throw new Error("Token inválido");
		}

		return usuario;
	} catch (error) {
		throw new Error("Token inválido");
	}
};

module.exports = { login, verificarToken };
