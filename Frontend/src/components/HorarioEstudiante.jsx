import { useState } from "react";

//temporal
const horariosMock = [
    { id: 1, dia: "LUNES", vehiculo: "Toyota Yaris", profesor: "Juan Pérez" },
    { id: 2, dia: "MIERCOLES", vehiculo: "Toyota Yaris", profesor: "Juan Pérez" },
];

function HorarioEstudiante() {
    const [horarios] = useState(horariosMock);

    return (
        <div className="HorarioEstudiante">
            <h3>Mis clases</h3>
            {horarios.length === 0 && <p>No tienes clases agendadas aún.</p>}
            <ul>
                {horarios.map((h) => (
                    <li key={h.id}>
                        <strong>{h.dia}</strong> — {h.vehiculo} con {h.profesor}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HorarioEstudiante;