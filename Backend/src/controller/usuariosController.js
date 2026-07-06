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

const obtenerUsuarios = async (req, res) => {
	try {
		const usuarios = await usuarioService.obtenerUsuarios();
		sendSuccess(res, usuarios, "Usuarios obtenidos exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al obtener los usuarios", 500);
	}
}

const obtenerUsuarioPorId = async (req, res) => {
	try {
		const { id } = req.params;
		const usuario = await usuarioService.obtenerUsuarioPorId(id);
		if (!usuario) {
			return sendError(res, "Usuario no encontrado", 404);
		}
		sendSuccess(res, usuario, "Usuario obtenido exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al obtener el usuario", 500);
	}
}

const obtenerAlumnoPorId = async (req, res) => {
	try {
		const { id } = req.params;
		const usuario = await usuarioService.obtenerAlumnoPorId(id);
		if (!usuario) {
			return sendError(res, "Usuario no encontrado", 404);
		}
		sendSuccess(res, usuario, "Usuario obtenido exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al obtener el usuario", 500);
	}
}

const obtenerProfesorPorId = async (req, res) => {
	try {
		const { id } = req.params;
		const usuario = await usuarioService.obtenerProfesorPorId(id);
		if (!usuario) {
			return sendError(res, "Usuario no encontrado", 404);
		}
		sendSuccess(res, usuario, "Usuario obtenido exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al obtener el usuario", 500);
	}
};

const obtenerPerfil = async (req, res) => {
	try {
		const usuario = req.usuario; // El usuario autenticado se encuentra en req.usuario
		sendSuccess(res, usuario, "Perfil obtenido exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al obtener el perfil", 500);
	}
};

const actualizarUsuario = async (req, res) => {
	try {
		const { error } = updateUsuarioSchema.validate(req.body);

		if (error) {
			return sendError(
				res,
				"Datos de usuario inválidos",
				400,
				error.details[0].message,
			);
		}

		const usuarioId = req.usuario.id; // Obtener el ID del usuario autenticado

		const usuarioActualizado = await usuarioService.actualizarUsuario(
			usuarioId,
			req.body,
		);

		if (!usuarioActualizado) {
			return sendError(res, "Usuario no encontrado", 404);
		}

		sendSuccess(
			res,
			usuarioActualizado,
			"Usuario actualizado exitosamente",
			200,
		);
	} catch (error) {
		sendError(res, "Error al actualizar el usuario", 500);
	}
};

const eliminarUsuario = async (req, res) => {
	try {
		const usuarioId = req.usuario.id; // Obtener el ID del usuario autenticado

		const eliminado = await usuarioService.eliminarUsuario(usuarioId);

		if (!eliminado) {
			return sendError(res, "Usuario no encontrado", 404);
		}

		sendSuccess(res, null, "Usuario eliminado exitosamente", 200);
	} catch (error) {
		sendError(res, "Error al eliminar el usuario", 500);
	}
};

module.exports = {
	crearUsuario,
	obtenerPerfil,
	actualizarUsuario,
	eliminarUsuario,
};
