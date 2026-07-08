import { useState } from "react";
import { obtenerHorariosPorProfesor } from "../services/horarioService";
import { getInscripcionAlumno } from "../services/inscripcionService";
import { listarProfesores } from "../services/usuarioService";

const obtenerHorarios = async () => {
  try {
    const inscripcionRes = await getInscripcionAlumno();
    if (!inscripcionRes.success || !inscripcionRes.data) {
      console.error(
        "Error al obtener la inscripción del alumno:",
        inscripcionRes.message,
      );
      return [];
    }

    const profesorId = inscripcionRes.data.profesorId;
    const horariosRes = await obtenerHorariosPorProfesor(profesorId);

    if (!horariosRes.success) {
      console.error(
        "Error al obtener los horarios del profesor:",
        horariosRes.message,
      );
      return [];
    }

    return horariosRes.data.data;
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    return [];
  }
};

function HorarioEstudiante() {
  const [horarios, setHorarios] = useState([]);

  useState(() => {
    const fetchHorarios = async () => {
      const horariosData = await obtenerHorarios();
      setHorarios(horariosData);
    };

    fetchHorarios();
  }, []);

  return (
    <div className="HorarioEstudiante">
      <h3>Mis clases</h3>
      {horarios.length === 0 && <p>No tienes clases agendadas aún.</p>}
      <ul>
        {horarios.map((h) => (
          <li key={h.id}>
            <strong>{h.dia}</strong> — {h.horaInicio} - {h.horaFin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HorarioEstudiante;
