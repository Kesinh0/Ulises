import axios from 'rootService.js';   

export async function getVehiculos() {
  try {
    const response = await axios.get('/vehiculos');
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Vehículos obtenidos exitosamente',
    };
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener los vehículos',
    };
  }
}

export async function obtenerVehiculoPorId(id) {
  try {
    const response = await axios.get(`/vehiculos/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Vehículo obtenido exitosamente',
    };
  } catch (error) {
    console.error(`Error al obtener el vehículo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al obtener el vehículo',
    };
  }
}

export async function crearVehiculo(vehiculoData) {
  try {
    const response = await axios.post('/vehiculos', vehiculoData);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Vehículo creado exitosamente',
    };
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al crear el vehículo',
    };
  }
}

export async function actualizarVehiculo(id, vehiculoData) {
  try {
    const response = await axios.put(`/vehiculos/${id}`, vehiculoData);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Vehículo actualizado exitosamente',
    };
  } catch (error) {
    console.error(`Error al actualizar el vehículo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al actualizar el vehículo',
    };
  }
}

export async function borrarVehiculo(id) {
  try {
    const response = await axios.delete(`/vehiculos/${id}`);
    return {
        success: true,
        data: response.data,
        message: response.data.message || 'Vehículo eliminado exitosamente',
    };
  } catch (error) {
    console.error(`Error al eliminar el vehículo con ID ${id}:`, error);
    return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Error al eliminar el vehículo',
    };
  }
}