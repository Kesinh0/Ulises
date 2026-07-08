import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { listarProfesores } from "../services/usuarioService.js";
import inscripcionService from "../services/inscripcionService.js";
import useAuth from "../hooks/useAuth.js";
import horarioService from "../services/horarioService.js";

const ProfesorCard = ({ profesor, horarios, onInscribirse }) => {
  const [mostrarHorarios, setMostrarHorarios] = useState(false);

  const toggleHorarios = () => {
    setMostrarHorarios(!mostrarHorarios);
  };

  return (
    <div className="profesor-card">
      <h3>{profesor.nombre}</h3>
      <p>Correo: {profesor.correo}</p>
      <button onClick={() => onInscribirse(profesor.id)}>Inscribirse</button>
      <button onClick={toggleHorarios}>
        {mostrarHorarios ? "Ocultar Horarios" : "Ver Horarios"}
      </button>
      {mostrarHorarios && horarios && (
        <ul>
          {horarios.map((h) => (
            <li key={h.id}>
              {h.dia} {h.horaInicio} - {h.horaFin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const inscripcionManager = () => {
  const [profesores, setProfesores] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await listarProfesores();
        setProfesores(response);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfesores();
  }, []);

  const handleInscribirse = async (profesorId) => {
    // Lógica para inscribirse al profesor con el ID proporcionado
    console.log(`Inscribiéndose al profesor con ID: ${profesorId}`);
    const inscripcionData = {
      profesorId: profesorId,
      alumnoId: usuario.id,
    };
    try {
      await inscripcionService.crearInscripcion(inscripcionData);

      navigate("/estudiante");
    } catch (error) {
      console.error("Error al inscribirse al profesor:", error);
      alert("error al inscribirse al profesor: " + error.message);
    }
  };

  /* const handleVerHorarios = async(profesorId) => {
        // Lógica para ver los horarios del profesor con el ID proporcionado
        console.log(`Ver horarios del profesor con ID: ${profesorId}`);
        try {
            const response = await horarioService.obtenerHorariosPorProfesor(profesorId);
            console.log("Horarios obtenidos:", response);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los horarios del profesor:", error);
            alert("Error al obtener los horarios del profesor: " + error.message);
        }
    };*/

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const horariosPromises = profesores.map((profesor) =>
          horarioService.obtenerHorariosPorProfesor(profesor.id),
        );
        const horariosResponses = await Promise.all(horariosPromises);
        const horariosData = horariosResponses.map(
          (response) => response.data.data,
        );
        setHorarios(horariosData);
      } catch (error) {
        console.error(
          "Error al obtener los horarios de los profesores:",
          error,
        );
      }
    };

    if (profesores.length > 0) {
      fetchHorarios();
    }
  }, [profesores]);

  return (
    <div>
      <h2>Lista de Profesores</h2>
      <div className="profesores">
        {profesores.map((profesor, index) => (
          <ProfesorCard
            key={profesor.id}
            profesor={profesor}
            horarios={horarios[index]}
            onInscribirse={handleInscribirse}
          />
        ))}
      </div>
    </div>
  );
};

export default inscripcionManager;
