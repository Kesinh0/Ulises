import { useEffect, useState } from "react";
import { getVehiculos } from "../services/vehiculoService";
import { getHorarios, crearHorario } from "../services/horarioService";
import useAuth from "../hooks/useAuth";

const DIAS = [
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
  "DOMINGO",
];

function ClassManager() {
  const [horarios, setHorarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({ dia: "", vehiculoId: "" });
  const [hora, setHora] = useState({ horaInicio: "", horaFin: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();

  const profesorActualId = usuario?.id;

  useEffect(() => {
    async function cargarDatos() {
      const [vehiculosRes, horariosRes] = await Promise.all([
        getVehiculos(),
        getHorarios(),
      ]);

      if (vehiculosRes.success) {
        //solo los que no estan en mantenimiento
        setVehiculos(vehiculosRes.data.filter((v) => !v.enMantenimiento));
      } else {
        setError(vehiculosRes.message);
      }

      if (horariosRes.success) {
        //horarios que son del profe
        setHorarios(
          horariosRes.data.filter((h) => h.usuarioId === profesorActualId),
        );
      } else {
        setError(horariosRes.message);
      }
    }
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const nuevoHorario = {
      dia: formData.dia,
      vehiculoId: Number(formData.vehiculoId),
      horaInicio: hora.horaInicio,
      horaFin: hora.horaFin,
    };
    const res = await crearHorario(nuevoHorario);

    if (res.success) {
      setHorarios([...horarios, res.data]);
      setFormData({ dia: "", vehiculoId: "" });
    } else {
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="ClassManager">
      <h3>Agregar Una Clase</h3>
      {error && <p className="error-msg">{error}</p>}

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
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.marca} {v.modelo} ({v.anio})
              </option>
            ))}
          </select>
        </label>
        <label>
          Selecciona hora de inicio:
          <input
            type="time"
            name="horaInicio"
            value={hora.horaInicio}
            onChange={(e) => setHora({ ...hora, horaInicio: e.target.value })}
            required
          />
        </label>
        <label>
          Selecciona hora de fin:
          <input
            type="time"
            name="horaFin"
            value={hora.horaFin}
            min={hora.horaInicio}
            onChange={(e) => setHora({ ...hora, horaFin: e.target.value })}
            required
          />
        </label>
        <p>
          <br />
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "creando..." : "Crear Clase"}
        </button>
      </form>

      <div className="class-list">
        <p>
          <br />
        </p>
        {horarios.length === 0 && <p>No has creado clases aún.</p>}
        <ul>
          {horarios.map((h) => {
            const vehiculo = vehiculos.find((v) => v.id === h.vehiculoId);
            return (
              <li key={h.id}>
                <strong>
                  {h.dia}:<br /> {h.horaInicio} - {h.horaFin}
                </strong>{" "}
                {vehiculo?.marca} {vehiculo?.modelo}
              </li>
            );
          })}
        </ul>
        <p>
          <br />
        </p>
      </div>
    </div>
  );
}

export default ClassManager;
