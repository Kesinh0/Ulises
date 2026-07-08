import { useState } from "react";

// temporal
const materialMock = [
    { id: 1, titulo: "Señales de tránsito", material: "https://ejemplo.com/senales.pdf" },
    { id: 2, titulo: "Reglamento de manejo", material: "https://ejemplo.com/reglamento.pdf" },
];

function MaterialEstudiante() {
    const [material] = useState(materialMock);

    return (
        <div className="MaterialEstudiante">
            <h3>Material de clases</h3>
            {material.length === 0 && <p>Tu profesor no ha subido material aún.</p>}
            <ul>
                {material.map((m) => (
                    <li key={m.id}>
                        <strong>{m.titulo}</strong>
                        <br />
                        <a href={m.material} target="_blank" rel="noopener noreferrer">Ver material</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MaterialEstudiante;