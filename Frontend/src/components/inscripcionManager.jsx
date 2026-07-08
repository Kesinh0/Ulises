import { useState, useEffect } from "react";
import { listarProfesores } from "../services/usuarioService.js";
import inscripcionService from "../services/inscripcionService.js";
import useAuth from "../hooks/useAuth.js";
import horarioService from "../services/horarioService.js";

const inscripcionManager = () => {
  const [profesores, setProfesores] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useAuth();

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
      console.log("Inscripción creada exitosamente");
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
        console.log("Horarios obtenidos:", horariosData);
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

  console.log("Horarios obtenidos:", horarios);
  return (
    <div>
      <h2>Lista de Profesores</h2>
      <ul>
        {profesores.map((profesor, i) => (
          <li key={profesor.id}>
            nombre: {profesor.nombre} <br></br> correo: {profesor.correo}
            <br></br>
            <button onClick={() => handleInscribirse(profesor.id)}>
              Inscribirse
            </button>
            <ul>
              {horarios[i]?.map((horario) => (
                <li key={horario.id}>
                  dia: {horario.dia} <br></br> hora: {horario.horaInicio} -{" "}
                  {horario.horaFin}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default inscripcionManager;
