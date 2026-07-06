const { sendSuccess, sendError } = require("../handlers/responseHandler");
const usuarioService = require("../service/usuarioService");
const {
	usuarioSchema,
	updateUsuarioSchema,
} = require("../validation/usuarioV");

//crear un usuario
async function crearUsuario(req, res) {
	try {
		const { error } = usuarioSchema.validate(req.body);
		if (error) {
			return sendError(
				res,
				"Usuario invalido",
				400,
				error.details[0].message,
			);
		}

		const nuevoUsuario = await usuarioService.crearUsuario(req.body);
		sendSuccess(res, nuevoUsuario, "Usuario creado exitosamente", 201);
	} catch (error) {
		if (error.message === "El correo ya está registrado.") {
			return sendError(res, error.message, 400);
		}
		sendError(res, "Error al crear el usuario", 500);
	}
}

module.exports = { crearUsuario };
