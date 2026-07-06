const { sendSuccess, sendError } = require("../handlers/responseHandler");
const authService = require("../service/authService");
const { loginSchema } = require("../validation/loginV");

const login = async (req, res) => {
	try {
		const { correo, contrasena } = req.body;

		const { error } = loginSchema.validate({ correo, contrasena });

		if (error) {
			return sendError(
				res,
				"Datos de inicio de sesión inválidos",
				400,
				error.details[0].message,
			);
		}

		const { token } = await authService.login(correo, contrasena);

		sendSuccess(res, { token }, "Inicio de sesión exitoso", 200);
	} catch (error) {
		if (error.message === "Credenciales inválidas") {
			return sendError(res, error.message, 401);
		}

		console.error("Error al iniciar sesión:", error);

		sendError(res, "Error al iniciar sesión", 500);
	}
};

module.exports = { login };
