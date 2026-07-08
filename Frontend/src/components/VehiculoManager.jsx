import { useEffect, useState } from "react";
import { getVehiculos } from "../services/vehiculoService.js";

function VehiculoManager() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      setCargando(true);
      setError(null);

      try {
        const data = await getVehiculos();
        setVehiculos(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    fetchVehiculos();
  }, []);

  return (
    <div>
      <h2>Administración de Vehículos</h2>
      {cargando && <p>Cargando vehículos...</p>}
      {error && <p>Error: {error}</p>}
      {!cargando && !error && (
        <ul>
          {vehiculos.length === 0 ? (
            <p>No hay vehículos registrados.</p>
          ) : (
            vehiculos.map((vehiculo) => (
              <li key={vehiculo.id}>
                {vehiculo.marca} - {vehiculo.modelo} ({vehiculo.anio}) -{" "}
                {vehiculo.estado}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
export default VehiculoManager;
