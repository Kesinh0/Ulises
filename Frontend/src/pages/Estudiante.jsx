import { useNavigate } from "react-router-dom";
import estudiante from "../assets/Alumno.png";

const Estudiante = () => {
    const navigate = useNavigate();
    return (
        <div className="right" id="right">
            <h1>
                    Estudiante
                </h1>
            <div className="Estudiante">
                <img src={estudiante} alt="estudiante" className="estudiante-image"/>
                <p>
                    Bienvenido a la página del estudiante.
                </p>
                {/*si no esta inscrito a una clase*/}
                {/*Selector de clases disponibles*/}

                {/*Si está inscrito a una clase*/}
                {/*Horarios de clases*/}
                {/*boton para ir a ver el apartado de clases y apuntes del profesor*/}
                {/*Boton de darse de baja */}
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        </div>
    )
}
export default Estudiante