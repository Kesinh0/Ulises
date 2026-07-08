import { useEffect, useState } from "react";
import { getVehiculos, crearVehiculo, actualizarVehiculo, borrarVehiculo } from "../services/vehiculoService.js";

const formVacio = {
  marca:"",
  modelo:"",
  anio:"",
  estado:"disponible",
  enMantenimiento:false,
}


function VehiculoManager() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // null = creando, id = editando
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    setCargando(true);
    setError(null);

    try {
      const data = await getVehiculos();
      setVehiculos(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const abrirCrear = () => {
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
    setMostrarForm(true);
  };

  const abrirEditar = (vehiculo) => {
    setEditandoId(vehiculo.id);
    setFormData({
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      estado: vehiculo.estado,
      enMantenimiento: vehiculo.enMantenimiento,
    });
    setErrorForm(null);
    setMostrarForm(true);
  };

  const cancelarForm = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm(null);

    const datosVehiculo = {
      ...formData,
      anio: Number(formData.anio),
    };

    const res = editandoId
      ? await actualizarVehiculo(editandoId, datosVehiculo)
      : await crearVehiculo(datosVehiculo);

    if (res.success) {
      if (editandoId) {
        setVehiculos(vehiculos.map((v) => (v.id === editandoId ? res.data : v)));
      } else {
        setVehiculos([...vehiculos, res.data]);
      }
      cancelarForm();
    } else {
      setErrorForm(res.message);
    }

    setGuardando(false);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este vehículo?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarVehiculo(id);

    if (res.success) {
      setVehiculos(vehiculos.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  return (
    <div>
      <h2>Administración de Vehículos</h2>
      {cargando && <p>Cargando vehículos...</p>}
      {error && <p>Error: {error}</p>}

      {!cargando && !error && (
        <ul>
          {vehiculos.length === 0 ? (
            <p>No hay vehículos registrados.</p>
          ) : (
            vehiculos.map((vehiculo) => (
              <li key={vehiculo.id}>
                {vehiculo.marca} - {vehiculo.modelo} ({vehiculo.anio}) - {vehiculo.estado}
                {vehiculo.enMantenimiento && " (en mantenimiento)"}
                <button onClick={() => abrirEditar(vehiculo)}>Editar</button>
                <button
                  onClick={() => handleEliminar(vehiculo.id)}
                  disabled={eliminandoId === vehiculo.id}
                >
                  {eliminandoId === vehiculo.id ? "Eliminando..." : "Eliminar"}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {!mostrarForm && (
        <button onClick={abrirCrear}>Agregar nuevo vehículo</button>
      )}

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="vehiculo-form">
          <h3>{editandoId ? "Editar vehículo" : "Nuevo vehículo"}</h3>
          {errorForm && <p className="error-msg">{errorForm}</p>}

          <label>
            Marca
            <input type="text" name="marca" value={formData.marca} onChange={handleChange} required />
          </label>

          <label>
            Modelo
            <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
          </label>

          <label>
            Año
            <input type="number" name="anio" value={formData.anio} onChange={handleChange} required />
          </label>

          <label>
            Estado
            <input type="text" name="estado" value={formData.estado} onChange={handleChange} required />
          </label>

          <label>
            <input type="checkbox" name="enMantenimiento" checked={formData.enMantenimiento} onChange={handleChange} />
            En mantenimiento
          </label>

          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : editandoId ? "Guardar cambios" : "Crear vehículo"}
          </button>
          <button type="button" onClick={cancelarForm}>Cancelar</button>
        </form>
      )}
    </div>
  );
}
export default VehiculoManager;
