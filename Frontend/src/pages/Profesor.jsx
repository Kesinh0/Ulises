import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import profesor from "../assets/Profesor.png";
import ClassManager from "../components/ClassManager";
import MaterialManager from "../components/MaterialManager";
import AlumnoManager from "../components/AlumnoManager";

const TABS = [
    { id: "horario", label: "Horario", component: ClassManager },
    { id: "materia", label:"Material", component: MaterialManager},
    { id: "alumnos", label:"Curso", component: AlumnoManager},
    //agregar tabs aca cuando se crean
];

const Profesor = () => {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(TABS[0].id);
    const [nombreProfesor, setNombreProfesor] = useState("");
        
    useEffect(() => {
        const token = cookies.get("jwt-auth");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                setNombreProfesor(decoded.nombre || "");
            } catch (err) {
                console.error("Error al decodificar el token:", err);
            }
        }
    }, []);

    const TabComponent = TABS.find((t) => t.id === tabActiva)?.component;

    return (
        <div className="right" id="right"> 
            <h1>
                Portal del profesor
            </h1>

            <div className="Profesor">
                <img src={profesor} alt="profesor" className="profesor-image"/>
                <p>
                    Bienvenido de vuelta, {nombreProfesor || "error"}. 
                </p>
                {/*Panel de control del profesor*/}
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
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        </div>
    )
}

export default Profesor