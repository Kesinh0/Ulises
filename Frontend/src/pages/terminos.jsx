import { useNavigate } from "react-router-dom";
const Terminos = () => {
    return (
        <div className="right" id="right"> 
            <div className="terminos-container">
                <h1>Términos y Condiciones</h1>
                <p>
                <br /> Bienvenido a nuestra aplicación de escuela de manejo. 
                <br /> Antes de utilizar nuestros servicios, por favor lea atentamente
                <br />los siguientes términos y condiciones:
                </p>
                
                <ol className="terminos-list">
                    <li className="terminos-list-item">
                        <br />
                        <strong>Uso de la Aplicación:</strong>
                        <br />
                        <br /> 
                        Al usar esta aplcicación, usted acepta cumplir con todas las leyes y regularicaciones aplicables.
                        No se le permite el uso de esta aplicación para actividades ilegales o no planeadas por la misma.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Registro de Usuario:</strong>
                        <br />
                        <br /> 
                        Para acceder a las funciones de la aplicación, se requiere que se registre como usuario mediante el uso de un correo y contraseña.
                        Usted es responsable de las consecuencias de sus acciones.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Privacidad:</strong>
                        <br />
                        <br /> 
                        No respetamos su privacidad y tampoco nos interesa proteger su informacion personal.
                        Al usar nuestra aplicación, usted acepta que vamos a recopilar, usar y compartir su información de acuerdo con nuestra política de privacidad.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Limitación de Responsabilidad:</strong>
                        <br />
                        <br /> 
                        La aplicación se proporciona "tal cual" y no garantizamos su disponibilidad continua o libre de errores. 
                        No nos hacemos responsables de cualquier daño o pérdida que pueda surgir del uso de la aplicación.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Modificaciones:</strong>
                        <br />
                        <br /> 
                        Nos reservamos el derecho de simplemente modificar estos términos y condiciones en cualquier momento.
                        Cualquier cambio será efectivo inmediatamente después de su publicación en la aplicación.
                        SIN EXCEPCIONES.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Contacto:</strong>
                        <br />
                        <br /> 
                        Si tiene alguna pregunta o inquietud sobre estos términos y condiciones, 
                        puede contactarnos a través de los medios proporcionados en la aplicación.
                        No se garantiza respuesta a sus preguntas.
                    </li>
                    <li className="terminos-list-item">
                        <br /><strong>Propiedad de su Alma:</strong>
                        <br />
                        <br /> 
                        Al utilizar nuestra aplicación, usted acepta que nos pertenece su alma y que podemos hacer con ella lo que queramos.
                        Cualquier intento de reclamar su alma será considerado un acto de traición y será castigado severamente.
                    </li>
                </ol>
                <p><br />Al utilizar nuestra aplicación, usted reconoce que ha leído, comprendido y aceptado estos términos y condiciones.</p>
                <button onClick={() => {
                    window.close();
                    // Si sigue aquí después de un momento, significa que no se pudo cerrar
                    setTimeout(() => {
                        alert('Por favor cierra esta pestaña manualmente, no seas malo.');
                    }, 300);
                    }}>
                    Cerrar Esta Pestaña
                </button>
            </div>
        </div>
    );
}
export default Terminos;