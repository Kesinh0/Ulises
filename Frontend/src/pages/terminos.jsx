import { useNavigate } from "react-router-dom";
const Terminos = () => {
    return (
        <div className="right" id="right"> 
            <div className="terminos-container">
                <h1>Términos y Condiciones</h1>
                <p>Bienvenido a nuestra aplicación de escuela de manejo. <br /> Antes de utilizar nuestros servicios, por favor lea atentamente<br />los siguientes términos y condiciones:</p>
                
                <ol className="terminos-list">
                    <li className="terminos-list-item"><br /><strong>Uso de la Aplicación:</strong><br /><br /> Al utilizar nuestra aplicación, usted acepta cumplir con todas las leyes y regulaciones aplicables. No se permite el uso de la aplicación para actividades ilegales o no autorizadas.</li>
                    <li className="terminos-list-item"><br /><strong>Registro de Usuario:</strong><br /><br /> Para acceder a ciertas funciones de la aplicación, es posible que se requiera registrarse como usuario. Usted es responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran bajo su cuenta.</li>
                    <li className="terminos-list-item"><br /><strong>Privacidad:</strong><br /><br /> Respetamos su privacidad y nos comprometemos a proteger su información personal. Consulte nuestra política de privacidad para obtener más detalles sobre cómo recopilamos, usamos y protegemos su información.</li>
                    <li className="terminos-list-item"><br /><strong>Limitación de Responsabilidad:</strong><br /><br /> La aplicación se proporciona "tal cual" y no garantizamos su disponibilidad continua o libre de errores. No nos hacemos responsables de cualquier daño o pérdida que pueda surgir del uso de la aplicación.</li>
                    <li className="terminos-list-item"><br /><strong>Modificaciones:</strong><br /><br /> Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en la aplicación.</li>
                    <li className="terminos-list-item"><br /><strong>Contacto:</strong><br /><br /> Si tiene alguna pregunta o inquietud sobre estos términos y condiciones, puede contactarnos a través de los medios proporcionados en la aplicación.</li>
                </ol>
                <p><br />Al utilizar nuestra aplicación, usted reconoce que ha leído, comprendido y aceptado estos términos y condiciones.</p>
            </div>
        </div>
    );
}
export default Terminos;