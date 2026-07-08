import { useNavigate } from "react-router-dom";
const inscripcionService = "../services/inscripcionService.js";
import { useState, useEffect, useCallback } from "react";
import ProfeManager from "../components/ProfeManager.jsx";

const useProfesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfesores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await seleccionarProfesor();
      if (response.success) {
        setProfesores(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Error al obtener los profesores");
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminarProfesor = async (id) => {
    try {
      const response = await inscripcionService.eliminarInscripcion(id);
      if (response.success) {
        setProfesores((prevProfesores) =>
          prevProfesores.filter((profesor) => profesor.id !== id),
        );
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Error al eliminar el profesor");
    }
  };

  return { profesores, loading, error, fetchProfesores, eliminarProfesor };
};

const Inscripciones = () => {
  const { profesores, loading, error, fetchProfesores, eliminarProfesor } =
    useProfesores();

  useEffect(() => {
    fetchProfesores();
  }, [fetchProfesores]);

  return (
    <div>
      <h1>Lista de Profesores</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ProfeManager profesores={profesores} onEliminar={eliminarProfesor} />
      )}
    </div>
  );
};

export default Inscripciones;
