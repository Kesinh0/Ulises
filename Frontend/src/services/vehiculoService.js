import axios from 'rootService.js';   

export async function getVehiculos() {
  try {
    const response = await axios.get('/vehiculos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    throw error;
  }
}

export async function obtenerVehiculoPorId(id) {
  try {
    const response = await axios.get(`/vehiculos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el vehículo con ID ${id}:`, error);
    throw error;
  }
}

export async function crearVehiculo(vehiculoData) {
  try {
    const response = await axios.post('/vehiculos', vehiculoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    throw error;
  }
}

export async function actualizarVehiculo(id, vehiculoData) {
  try {
    const response = await axios.put(`/vehiculos/${id}`, vehiculoData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el vehículo con ID ${id}:`, error);
    throw error;
  }
}

export async function borrarVehiculo(id) {
  try {
    const response = await axios.delete(`/vehiculos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el vehículo con ID ${id}:`, error);
    throw error;
  }
}