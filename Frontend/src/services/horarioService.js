import axios from './rootService.js';

export async function getHorarios() {
  try {
    const response = await axios.get('/horarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    throw error;
  }
}

export async function obtenerHorarioPorId(id) {
  try {
    const response = await axios.get(`/horarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el horario con ID ${id}:`, error);
    throw error;
  }
}

export async function crearHorario(horarioData) {
  try {
    const response = await axios.post('/horarios', horarioData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el horario:', error);
    throw error;
  }
}

export async function actualizarHorario(id, horarioData) {
  try {
    const response = await axios.put(`/horarios/${id}`, horarioData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el horario con ID ${id}:`, error);
    throw error;
  }
}

export async function borrarHorario(id) {
  try {
    const response = await axios.delete(`/horarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el horario con ID ${id}:`, error);
    throw error;
  }
}