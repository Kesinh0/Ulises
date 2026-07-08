import cookie from "js-cookie";
import axios from "./rootService.js";
import listarProfesores from "./usuarioService.js";

export const getInscripcionAlumno = async () => {
	try {
		const jwt = cookie.get("jwt-auth", { path: "/" });

		const response = await axios.get("/inscripciones/alumno", {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		return {
			success: true,
			data: response.data.data || null,
			message:
				response.data.message || "Inscripción obtenida exitosamente",
		};
	} catch (error) {
		// No debería funcionar, pero funciona. No tocar
		if (error.response && error.response.status === 404) {
			return {
				success: true,
				data: null,
				message: "No se encontró inscripción para el alumno",
			};
		}

		console.error("Error al obtener la inscripción del alumno:", error);
		return {
			success: false,
			data: null,
			message:
				error.response?.data?.message ||
				"Error al obtener la inscripción del alumno",
		};
	}
};

export const getInscripciones = async () => {
	try {
		const response = await axios.get("/profesores");
		return {
			success: true,
			data: response.data,
			message:
				response.data.message || "Inscripciones obtenidas exitosamente",
		};
	} catch (error) {
		console.error("Error al obtener las inscripciones:", error);
		return {
			success: false,
			data: null,
			message:
				error.response?.data?.message ||
				"Error al obtener las inscripciones",
		};
	}
};

export const crearInscripcion = async (inscripcionData) => {
	try {
		const response = await axios.post("/inscripciones", inscripcionData);
		return {
			success: true,
			data: response.data,
			message: response.data.message || "Inscripción creada exitosamente",
		};
	} catch (error) {
		console.error("Error al crear la inscripción:", error);
		return {
			success: false,
			data: null,
			message:
				error.response?.data?.message ||
				"Error al crear la inscripción",
		};
	}
};

export const eliminarInscripcion = async (id) => {
	try {
		const response = await axios.delete(`/inscripciones/${id}`);
		return {
			success: true,
			data: response.data,
			message:
				response.data.message || "Inscripción eliminada exitosamente",
		};
	} catch (error) {
		console.error(`Error al eliminar la inscripción con ID ${id}:`, error);
		return {
			success: false,
			data: null,
			message:
				error.response?.data?.message ||
				"Error al eliminar la inscripción",
		};
	}
};

export default {
	getInscripciones,
	crearInscripcion,
	eliminarInscripcion,
};
