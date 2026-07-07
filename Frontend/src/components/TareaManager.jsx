import { useState } from "react";

// temporal mientras conectamos
const cursosMock = [
    { id: 1, nombre: "Manejo Básico - Grupo A" },
    { id: 2, nombre: "Manejo Avanzado - Grupo B" },
];

function TareaManager() {
    const [tareas, setTareas] = useState([]);
    const [formData, setFormData] = useState({
        cursoId: "",
        titulo: "",
        descripcion: "",
        material: "",
        fechaEntrega: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevaTarea = {
            id: Date.now(), // temporal
            cursoId: Number(formData.cursoId),
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            material: formData.material,
            fechaEntrega: formData.fechaEntrega,
            fechaRegistro: new Date().toISOString().split("T")[0], // CURRENT_DATE
        };

        setTareas([...tareas, nuevaTarea]);

        setFormData({
            cursoId: "",
            titulo: "",
            descripcion: "",
            material: "",
            fechaEntrega: "",
        });
    };

    return (
        <div className="TareaManager">
            <h3>Crear tarea</h3>
            <form onSubmit={handleSubmit} className="tarea-form">
                <label>
                    Curso
                    <p></p> 
                    <select
                        name="cursoId"
                        value={formData.cursoId}
                        onChange={handleChange}
                        required
                        className="select-form"
                    >
                        <option value="">Selecciona un curso</option>
                        {cursosMock.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Título
                    <p></p>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
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
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        maxLength={255}
                    />
                </label>

                <label>
                    Fecha de entrega
                    <p></p>
                    <input
                        type="date"
                        name="fechaEntrega"
                        value={formData.fechaEntrega}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Crear tarea</button>
            </form>

            <div className="tarea-list">
                <p><br/><strong>Lista de Tareas</strong></p>
                {tareas.length === 0 && <p>No has creado tareas aún.</p>}
                <ul>
                    {tareas.map((t) => {
                        const curso = cursosMock.find((c) => c.id === t.cursoId);
                        return (
                            <li key={t.id}>
                                <strong>{t.titulo}</strong> — {curso?.nombre}
                                <br />
                                Entrega: {t.fechaEntrega}
                                {t.descripcion && <p>{t.descripcion}</p>}
                                {t.material && (
                                    <p>
                                        Material: <a href={t.material} target="_blank" rel="noopener noreferrer">{t.material}</a>
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default TareaManager;