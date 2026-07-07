import { useNavigate } from "react-router-dom";
import registerimg from "../assets/Register.png"
import { useState } from 'react';
import { register } from '../services/authService.js';

const Registro = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="right" id="right">
            <div className="registro-container">
                <h1>Registro</h1>
                <img src={registerimg} alt="registerimg" className="register-image"/>
                <form>
                    <div className="input-container">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" placeholder="Ingresa tu correo electrónico" name="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" name="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <input type="password" placeholder="Confirma tu contraseña" name="confirm-password" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
                        <label className="terms-label">
                            <input type="checkbox" name="terms" required />
                            Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer"> términos y condiciones</a>
                        </label>
                    </div>
                    {/* el botón de registrarse debe mandar la informacion a la base de datos */}
                    <button onClick={handleSubmit} type="submit">Registrarse</button>
                    <button onClick={(e) => navigate("/")} type="button">Volver al inicio</button>
                    <p><br/></p>
                </form>
            </div>
        </div>
    );
}

export default Registro;