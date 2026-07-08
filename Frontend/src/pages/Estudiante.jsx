import { useState } from "react";
import { useNavigate } from "react-router-dom";
import estudiante from "../assets/Alumno.png";
import HorarioEstudiante from "../components/HorarioEstudiante";
import MaterialEstudiante from "../components/MaterialEstudiante";

const TABS = [
    { id: "horario", label: "Mis Clases", component: HorarioEstudiante },
    { id: "material", label: "Material", component: MaterialEstudiante },
];

const Estudiante = () => {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(TABS[0].id);
    const TabComponent = TABS.find((t) => t.id === tabActiva)?.component;
    

    const handleDarseDeBaja = () => {
        const confirmar = window.confirm("¿Seguro que quieres darte de baja del curso?");
        if (confirmar) {
            
            alert("Función pendiente de conectar con el backend.");
        }
    };
    return (
        <div className="right" id="right">
            <h1>Estudiante</h1>
            <div className="Estudiante">
                <img src={estudiante} alt="estudiante" className="estudiante-image"/>
                <p>
                    Bienvenido a la página del estudiante.
                </p>
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

                <div className="tab-content">
                    {TabComponent && <TabComponent/>}
                </div>
                <button className="baja-btn" onClick={handleDarseDeBaja}>Darse de baja</button>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
                <button onClick={() => navigate("/inscripciones")}>Profesores</button>
            </div>
        </div>
    )
}
export default Estudiante