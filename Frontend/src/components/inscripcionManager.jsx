import {useState, useEffect} from 'react';
import { listarProfesores } from '../services/usuarioService.js';
import inscripcionService from '../services/inscripcionService.js';
import useAuth from "../hooks/useAuth.js";
import horarioService from '../services/horarioService.js';

const inscripcionManager = () => {
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("inscribirse");
    const [expanded, setExpanded] = useState(false);
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
    
    const handleInscribirse = async(profesorId) => {
        // Lógica para inscribirse al profesor con el ID proporcionado
        console.log(`Inscribiéndose al profesor con ID: ${profesorId}`);
        const inscripcionData = {
            profesorId: profesorId,
            alumnoId: usuario.id
        };
        try{
            await inscripcionService.crearInscripcion(inscripcionData);
            console.log("Inscripción creada exitosamente");
        } catch (error) {
            console.error("Error al inscribirse al profesor:", error);
            alert("error al inscribirse al profesor: " + error.message);
        }
    };

    const handleVerHorarios = async(profesorId) => {
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
    };

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <h2>Lista de Profesores</h2>
                <ul>
                    {profesores.map((profesor) => (
                        <li key={profesor.id}>nombre: {profesor.nombre} <br></br> correo: {profesor.correo}
                        <br></br>
                        <button onClick={() => handleVerHorarios(profesor.id)}>Ver horarios</button>
                        <button onClick={() => handleInscribirse(profesor.id)}>Inscribirse</button>
                    </li>
                    ))}

                </ul>
        </div>
    );
};

export default inscripcionManager;