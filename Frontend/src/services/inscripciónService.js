import axios from 'rootService.js';

export const getInscripciones = async () => {
  try {
    const response = await axios.get('/inscripciones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las inscripciones:', error);
    throw error;
  }
};

export const crearInscripcion = async (inscripcionData) => {
  try {
    const response = await axios.post('/inscripciones', inscripcionData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la inscripción:', error);
    throw error;
  }
};

export const eliminarInscripcion = async (id) => {
  try {
    const response = await axios.delete(`/inscripciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la inscripción con ID ${id}:`, error);
    throw error;
  }
};