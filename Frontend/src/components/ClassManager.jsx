import { useState } from "react";

const DIAS = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
];

//VALORES TEMPORALES MIENTRAS JUNTAN EL BACKEND
const vehiculosMock = [
    { id: 1, marca: "Toyota", modelo: "Yaris", anio: 2020, enMantenimiento: false },
    { id: 2, marca: "Chevrolet", modelo: "Sail", anio: 2019, enMantenimiento: false },
    { id: 3, marca: "Suzuki", modelo: "Swift", anio: 2021, enMantenimiento: true },
];
const profesorActualId = 1;
//FIN VALORES TEMPORALES

function ClassManager(){
    const [horarios, setHorarios] = useState([]);
    const [formData, setFormData] = useState({
        dia:"",
        vehiculoId: "",
    });
    //tambien cambiar despues
    const vehiculosDisponibles = vehiculosMock.filter((v) => !v.enMantenimiento);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoHorario = {
            id: Date.now(), // temporal, luego lo sacamos del backend
            dia: formData.dia,
            usuarioId: profesorActualId,
            vehiculoId: Number(formData.vehiculoId),
        };

        setHorarios([...horarios, nuevoHorario]);

        setFormData({
            dia:"",
            vehiculoId: "",
        });

        

        
        
    };
    return (
        <div className="ClassManager">
            <h3>Agregar Una Clase</h3>
            <form onSubmit={handleSubmit} className="class-form">
                <label>
                    <br />
                    <select
                        name="dia"
                        value={formData.dia}
                        onChange={handleChange}
                        required
                        className="select-form"
                    >
                        <option value="">Selecciona un día</option>
                        {DIAS.map((dia) => (
                            <option key={dia} value={dia}>
                                {dia}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <select
                        name="vehiculoId"
                        value={formData.vehiculoId}
                        onChange={handleChange}
                        required
                        className="select-form"
                    >
                        <option value="">Selecciona un vehículo</option>
                        {vehiculosDisponibles.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.marca} {v.modelo} ({v.anio})
                            </option>
                        ))}
                    </select>
                </label>
                <p><br /></p>        
                <button type="submit">Crear clase</button>
            </form>

            <div className="class-list">
                <p><br /></p>
                {horarios.length === 0 && <p>No has creado clases aún.</p>}
                <ul>
                    {horarios.map((h) => {
                        const vehiculo = vehiculosMock.find((v) => v.id === h.vehiculoId);
                        return (
                            <li key={h.id}>
                                <strong>{h.dia}</strong> — {vehiculo?.marca} {vehiculo?.modelo}
                            </li>
                        );
                    })}
                </ul>
                <p><br /></p>
            </div>
        </div>
    );
}

export default ClassManager



