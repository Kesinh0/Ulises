import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarioService from "../services/usuarioService.js";


function AlumnoManager(){
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate();

    const fetchAlumnos = async () => {
        try {
            const response = await usuarioService.listarAlumnos();
            setAlumnos(response);
        } catch (error) {
            console.error("Error al obtener los alumnos:", error);
        }
    };

    useState(() => {
        fetchAlumnos();
    }, []);

    return (
        <div className="alumno-manager">
            <h2>Lista de Alumnos</h2>
            <ul>
                {alumnos.map((alumno) => (
                    <li key={alumno.id}>
                        {alumno.nombre} - {alumno.correo}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate("/login")}>Volver al inicio</button>
        </div>
    );
}
export default AlumnoManager