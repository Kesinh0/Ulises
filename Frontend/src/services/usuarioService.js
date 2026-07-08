import axios from "./rootService.js";
import cookies from "js-cookie";

export async function obtenerPerfil() {
	try {
		const token = cookies.get("jwt-auth", { path: "/" });
		if (!token) {
			return null;
		}

		const response = await axios.get("/usuarios/perfil", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = response.data.data;
		sessionStorage.setItem("usuario", JSON.stringify(user));
		return user;
	} catch (error) {
		console.error("Error al obtener el perfil:", error);
		return null;
	}
}

export async function listarProfesores() {
	try {
		const token = cookies.get("jwt-auth", { path: "/" });
		if (!token) {
			return null;
		}

		const response = await axios.get("/usuarios/profesores", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data.data; // Devuelve la lista de profesores
	} catch (error) {
		console.error("Error al obtener la lista de profesores:", error);
		return null;
	}
}

export async function actualizarPerfil(usuarioData) {
	try {
		const token = cookies.get("jwt-auth", { path: "/" });
		if (!token) {
			return null;
		}

		const response = await axios.put("/usuarios/perfil", usuarioData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data; // Devuelve el usuario actualizado
	} catch (error) {
		console.error("Error al actualizar el perfil:", error);
		return null;
	}
}

export async function eliminarPerfil() {
	try {
		const token = cookies.get("jwt-auth", { path: "/" });
		if (!token) {
			return null;
		}

		const response = await axios.delete("/usuarios/perfil", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data.success; // Devuelve true si se eliminó correctamente
	} catch (error) {
		console.error("Error al eliminar el perfil:", error);
		return false;
	}
}

export async function crearProfesor(data) {
  try {
    const { correo, contrasena, nombre } = data;
    const response = await axios.post("/usuarios", {
      nombre,
      correo,
      contrasena,
      rol: "profesor",
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al conectar con el servidor",
    };
  }
}

export async function eliminarUsuario(id) {
	try {
		const token = cookies.get("jwt-auth", { path: "/" });
		if (!token) {
			return { success: false, message: "No hay sesión activa" };
		}

		const response = await axios.delete(`/usuarios/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return { success: true, data: response.data };
	} catch (error) {
		console.error("Error al eliminar el usuario:", error);
		return {
			success: false,
			message: error.response?.data?.message || "Error al eliminar el usuario",
		};
	}
}

