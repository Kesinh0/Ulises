import axios from 'rootService.js';

export const getInscripciones = async () => {
  try {
    const response = await axios.get('/inscripciones');
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Inscripciones obtenidas exitosamente',
    };
  } catch (error) {
    console.error('Error al obtener las inscripciones:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener las inscripciones',
    };
  }
};

export const crearInscripcion = async (inscripcionData) => {
  try {
    const response = await axios.post('/inscripciones', inscripcionData);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Inscripción creada exitosamente',
    };
  } catch (error) {
    console.error('Error al crear la inscripción:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear la inscripción',
    };
  }
};

export const eliminarInscripcion = async (id) => {
  try {
    const response = await axios.delete(`/inscripciones/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Inscripción eliminada exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar la inscripción con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar la inscripción',
    };
  }
};