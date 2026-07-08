import {useState, useEffect} from 'react';
import { listarProfesores } from '../services/inscripcionService.js';

const inscripcionManager = () => {
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
    return (
        <div>
            <h2>Lista de Profesores</h2>
            {loading ? (
                <p>Cargando profesores...</p>
            ) : (
                <ul>
                    {profesores.map((profesor) => (
                        <li key={profesor.id}>{profesor.nombre}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default inscripcionManager;