import { useNavigate } from "react-router-dom";
const Profesor = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>
                Profesor
            </h1>
            <p>
                Bienvenido a la página del profesor.
            </p>
            {/*Panel de control del profesor*/}
            {/*Formulario para crear clases (debe tener un selector del Vehiculo)*/}

            {/*vista de su Horario creado*/}
            {/*boton para ir a ver el apartado de clases y apuntes del profesor para ingresar material*/}

            {/*Apartado de curso*/}
            {/*ve a los alumnos que tienen registrada su clase, puede modificar su calificación y ingresar tareas*/}
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    )
}

export default Profesor