import { useEffect, useState } from "react";
import { listarProfesores } from "../services/usuarioService.js";

function ProfeManager() {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchProfesores();
  }, []);

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
              </li>
            ))
          )}
        </ul>
      )}

      <button>Crear nuevo profesor</button>
    </div>
  );
}

export default ProfeManager;
