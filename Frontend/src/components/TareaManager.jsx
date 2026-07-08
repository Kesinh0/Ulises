import { useState, useEffect } from "react";
import { getTareas, crearTarea } from "../services/tareaService";



function TareaManager() {
    const [tareas, setTareas] = useState([]);
    const [formData, setFormData] = useState({
        cursoId: "",
        titulo: "",
        descripcion: "",
        material: "",
        fechaEntrega: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function cargarTareas(){
            const res = await getTareas();
            if (res.success){
                setTareas(res.data);
            }else{
                setError(res.message);
            }
        }
        cargarTareas();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const res = await crearTarea(formData);

        if(res.success) {
            setTareas([...tareas, res.data]);
            setFormData({ titulo: "", descripcion: "", material: "", fechaEntrega: "" });
        }else{
            setError(res.message);
        }

        setLoading(false);
    };

    return (
        <div className="TareaManager">
            <h3>Crear tarea</h3>
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit} className="tarea-form">
                <label>
                    Titulo
                    <p></p> 
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} maxLength={100} required />
                </label>

                <label>
                    Título
                    <p></p>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} maxLength={255} />
                </label>

                <label>
                    Descripción
                    <p></p>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        maxLength={255}
                    />
                </label>

                <label>
                    Material (link o referencia)
                    <p></p>
                    <input type="text" name="material" value={formData.material} onChange={handleChange} maxLength={255} />
                </label>

                <label>
                    Fecha de entrega
                    <p></p>
                    <input type="date" name="fechaEntrega" value={formData.fechaEntrega} onChange={handleChange} required />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear tarea"}
                </button>
            </form>

            <div className="tarea-list">
                <p><br/><strong>Lista de Tareas</strong></p>
                {tareas.length === 0 && <p>No has creado tareas aún.</p>}
                <ul>
                    {tareas.map((t) => {
                        <li key={t.id}>
                            <strong>{t.titulo}</strong>
                            <br />
                            Entrega: {t.fechaEntrega}
                            {t.descripcion && <p>{t.descripcion}</p>}
                            {t.material && (
                                <p>Material: <a href={t.material} target="_blank" rel="noopener noreferrer">{t.material}</a></p>
                            )}
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default TareaManager;