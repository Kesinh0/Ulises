import { useNavigate } from "react-router-dom";
const Registro = () => {
    const navigate = useNavigate();
    return (
        <div className="registro-container">
            <h1>Registro</h1>
            <p>Bienvenido a la página de registro.</p>
            <form>
                <div className="input-container">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" placeholder="Ingresa tu correo electrónico" name="email" />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="Ingresa tu contraseña" name="password" />
                </div>
                {/* el botón de registrarse debe mandar la informacion a la base de datos */}
                <button onClick={() => navigate("/")} type="submit">Registrarse</button>
            </form>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
}

export default Registro;