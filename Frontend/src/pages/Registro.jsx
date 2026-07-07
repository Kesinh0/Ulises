import { useNavigate } from "react-router-dom";
import register from "../assets/Register.png"

const Registro = () => {
    const navigate = useNavigate();
    return (
        <div className="right" id="right">
            <div className="registro-container">
                <h1>Registracion</h1>
                <img src={register} alt="register" className="register-image"/>
                <form>
                    <div className="input-container">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" placeholder="Ingresa tu correo electrónico" name="email" />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" name="password" />
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <input type="password" placeholder="Confirma tu contraseña" name="confirm-password" />
                        <label className="terms-label">
                            <input type="checkbox" name="terms" required />
                            Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer"> términos y condiciones</a>
                        </label>
                    </div>
                    {/* el botón de registrarse debe mandar la informacion a la base de datos */}
                    <button onClick={() => navigate("/")} type="submit">Registrarse</button>
                    <button onClick={() => navigate("/")}>Volver al inicio</button>
                    <p><br/></p>
                </form>
            </div>
        </div>
    );
}

export default Registro;