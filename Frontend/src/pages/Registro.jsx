import { useNavigate } from "react-router-dom";
import registerimg from "../assets/Register.png"
import { useState } from 'react';
import { register } from '../services/authService.js';

const Registro = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(contrasena != confirmarContrasena){
            setError("La contraseña no coincide");
            return;
        }

        setLoading(true);

        const response = await register({ nombre, correo, contrasena });

        if(response.success){
            navigate("/login");
        }else{
            console.log(response);
            setError(response.message || "no se pudo completar el registro");
        }
        setLoading(false);
    };
    return (
        <div className="right" id="right">
            <div className="registro-container">
                <h1>Registro</h1>
                <img src={registerimg} alt="registerimg" className="register-image"/>

                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input type="text" placeholder="Ingresa tu nombre completo" 
                        name="nombre" value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} />
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" placeholder="Ingresa tu correo electrónico" 
                        name="email" value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" 
                        name="password" value={contrasena} 
                        onChange={(e) => setContrasena(e.target.value)} />
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <input type="password" placeholder="Confirma tu contraseña" 
                        name="confirm-password" value={confirmarContrasena} 
                        onChange={(e) => setConfirmarContrasena(e.target.value)} />
                        <label className="terms-label">
                            <input type="checkbox" name="terms" required />
                            Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer"> términos y condiciones</a>
                        </label>
                    </div>
                    {/* el botón de registrarse debe mandar la informacion a la base de datos */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                    <button type="button" onClick={() => navigate("/")}>Volver al inicio</button>
                    <p><br/></p>
                </form>
            </div>
        </div>
    );
}

export default Registro;