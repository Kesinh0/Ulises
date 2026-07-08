import { useEffect, useState } from "react";
import { listarProfesores, crearProfesor, eliminarUsuario } from "../services/usuarioService.js";

function ProfeManager() {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", correo: "", contrasena: "" });
  const [creando, setCreando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await listarProfesores();
      setProfesores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreando(true);
    setErrorForm(null);

    const response = await crearProfesor(formData);

    if (response.success) {
      setProfesores([...profesores, response.data]);
      setFormData({ nombre: "", correo: "", contrasena: "" });
      setMostrarForm(false);
    } else {
      setErrorForm(response.message);
    }

    setCreando(false);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este profesor?");
    if (!confirmar) return;

    setEliminandoId(id);
    const response = await eliminarUsuario(id);

    if (response.success) {
      setProfesores(profesores.filter((p) => p.id !== id));
    } else {
      alert(response.message || "No se pudo eliminar el profesor");
    }

    setEliminandoId(null);
  };


  return (
    <div>
      <h2>Administración de Profesores</h2>
      {cargando && <p>Cargando profesores...</p>}
      {error && <p>Error: {error}</p>}
      {!cargando && !error && (
        <ul>
          {profesores.length === 0 ? (
            <p>No hay profesores registrados.</p>
          ) : (
            profesores.map((profesor) => (
              <li key={profesor.id}>
                {profesor.nombre} - {profesor.correo}
                <button
                  onClick={()=>handleEliminar(profesor.id)}
                  disabled={eliminandoId === profesor.id}
                >
                  {eliminandoId === profesor.id ? "Eliminando..." : "Eliminar"}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <button onClick={() => setMostrarForm(!mostrarForm)}>
        {mostrarForm ? "Cancelar" : "Crear nuevo profesor"}
      </button>
      {mostrarForm && (
        <form onSubmit={handleSubmit} className="profe-form">
          {errorForm && <p className="error-msg">{errorForm}</p>}

          <label>
            Nombre
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>

          <label>
            Correo
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
          </label>

          <label>
            Contraseña
            <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
          </label>

          <button type="submit" disabled={creando}>
            {creando ? "Creando..." : "Guardar profesor"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfeManager;
