import {useNavigate} from "react-router-dom";
import inscripcionService from  "../services/inscripcionService.js";
import { useState, useEffect, useCallback } from 'react';
import inscripcionManager from "../components/inscripcionManager.jsx";
import usuarioService from "../services/usuarioService.js";

const tabla = [
  { id: "profes", 
  label: "Administracion Profesores", 
  component: inscripcionManager },
];

const Inscripciones = () => {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(tabla[0].id);
    const TabComponent = tabla.find((t) => t.id === tabActiva)?.component;
    const fetchProfesores = useCallback(async () => {
        try {
            const response = await usuarioService.listarProfesores();
            console.log("Profesores obtenidos:", response);
        } catch (error) {
            console.error("Error al obtener los profesores:", error);
        }
    }, []);

    useEffect(() => {
        fetchProfesores();
    }, [fetchProfesores]);

    return (
        <div className="right" id="right">
            <h1>Profesores</h1>
            <div className="Inscripciones">
                <div className="tabs-nav">
                </div>
                <div className="tab-content">
                    {TabComponent && <TabComponent />}
                </div>
                <button onClick={() => navigate("/estudiante")}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default Inscripciones;