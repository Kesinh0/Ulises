import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profesor from "../assets/Profesor.png";
import ClassManager from "../components/ClassManager";
import TareaManager from "../components/TareaManager";

const TABS = [
    { id: "horario", label: "Horario", component: ClassManager },
    { id: "tareas", label: "Tareas", component: TareaManager },
    //agregar tabs aca cuando se crean
];

const Profesor = () => {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(TABS[0].id);

    const TabComponent = TABS.find((t) => t.id === tabActiva)?.component;

    return (
        <div className="right" id="right"> 
            <h1>
                Portal del profesor
            </h1>

            <div className="Profesor">
                <img src={profesor} alt="profesor" className="profesor-image"/>
                <p>
                    Bienvenido de vuelta (PROFE). 
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