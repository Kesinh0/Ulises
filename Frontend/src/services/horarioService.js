import axios from './rootService.js';

export async function getHorarios() {
  try {
    const response = await axios.get('/horarios');
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horarios obtenidos exitosamente',
    };
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener los horarios',
    };
  }
}

export async function obtenerHorarioPorId(id) {
  try {
    const response = await axios.get(`/horarios/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horario obtenido exitosamente',
    };
  } catch (error) {
    console.error(`Error al obtener el horario con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener el horario',
    };
  }
}

export async function crearHorario(horarioData) {
  try {
    const response = await axios.post('/horarios', horarioData);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horario creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el horario:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear el horario',
    };
  }
}

export async function actualizarHorario(id, horarioData) {
  try {
    const response = await axios.put(`/horarios/${id}`, horarioData);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horario actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el horario con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al actualizar el horario',
    };
  }
}

export async function borrarHorario(id) {
  try {
    const response = await axios.delete(`/horarios/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horario eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el horario con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar el horario',
    };
  }
}

export async function obtenerHorariosPorProfesor(profesorId) {
  try {
    const response = await axios.get(`/horarios/profesor/${profesorId}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Horarios del profesor obtenidos exitosamente',
    };
  } catch (error) {
    console.error(`Error al obtener los horarios del profesor con ID ${profesorId}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener los horarios del profesor',
    };
  }
}

export default {
  getHorarios,
  obtenerHorarioPorId,
  crearHorario,
  actualizarHorario,
  borrarHorario,
  obtenerHorariosPorProfesor,
};