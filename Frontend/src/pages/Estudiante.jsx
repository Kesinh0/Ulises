import { useState } from "react";
import { useNavigate } from "react-router-dom";
import estudiante from "../assets/Alumno.png";
import HorarioEstudiante from "../components/HorarioEstudiante";
import MaterialEstudiante from "../components/MaterialEstudiante";
import inscripcionService from "../services/inscripcionService.js";
import usuarioService from "../services/usuarioService.js";

const TABS = [
  { id: "horario", label: "Mis Clases", component: HorarioEstudiante },
  { id: "material", label: "Material", component: MaterialEstudiante },
];

const useInscripcion = () => {
  const [inscripcion, setInscripcion] = useState({});

  const fetchInscripcion = async () => {
    try {
      const response = await inscripcionService.getInscripcionAlumno();
      console.log("Respuesta de la API:", response);
      if (response.success) {
        setInscripcion(response.data);
      } else {
        console.error(
          "Error al obtener la inscripción del alumno:",
          response.message,
        );
      }
    } catch (error) {
      console.error("Error al obtener la inscripción del alumno:", error);
    }
  };

  useState(() => {
    fetchInscripcion();
  }, []);

  return { inscripcion, fetchInscripcion };
};

const Estudiante = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(TABS[0].id);
  const TabComponent = TABS.find((t) => t.id === tabActiva)?.component;
  const { inscripcion } = useInscripcion();
  const profesor = usuarioService.obtenerUsuarioPorId(inscripcion.profesorId);

  console.log("Inscripción del alumno:", inscripcion);

  const handleDarseDeBaja = () => {
    const confirmar = window.confirm("¿Seguro que quieres darte de baja del curso?");
        if (confirmar) {
            inscripcionService.eliminarInscripcion(inscripcion.alumnoId)
                .then((response) => {
                    if (response.success) {
                        alert("Te has dado de baja del curso exitosamente.");
                        window.location.reload();
                    } else {
                        alert("Error al darse de baja: " + response.message);
                    }
                })
                .catch((error) => {
                    console.error("Error al darse de baja:", error);
                    alert("Error al darse de baja. Por favor, inténtalo de nuevo.");
                });
        } else {
            alert("No se ha realizado ninguna acción.");
        }
  };

  return (
    <div className="right" id="right">
      <h1>Estudiante</h1>
      <div className="Estudiante">
        <img src={estudiante} alt="estudiante" className="estudiante-image" />
        <p>Bienvenido a la página del estudiante.</p>
        <div className="tabs-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${tabActiva === tab.id ? "active" : ""}`}
              onClick={() => setTabActiva(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {inscripcion && (
          <>
            <div className="inscripcion-info">
              <h2>Inscripción</h2>
              <p>
                <strong>Profesor:</strong> {profesor?.nombre || "Profesor no encontrado"}
              </p>
              <div className="tab-content">
                {TabComponent && <TabComponent />}
              </div>
              <button className="baja-btn" onClick={handleDarseDeBaja}>
                Darse de baja
              </button>
              
            </div>
          </>
        )}

        {!inscripcion && (
          <>
            <p>No estás inscrito en ningún curso actualmente.</p>
            
          </>
        )}
        <button onClick={() => navigate("/inscripciones")}>
              Inscribirse a un curso
        </button>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    </div>
  );
};
export default Estudiante;
