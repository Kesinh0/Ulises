import {useNavigate} from "react-router-dom";
const inscripcionService =  "../services/inscripcionService.js";

function Inscripciones() {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div>
      <h1>Inscripciones</h1>
      <p>Esta es la página de inscripciones.</p>
      <button onClick={handleVolver}>Volver</button>
    </div>
  );
}
export default Inscripciones