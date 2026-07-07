import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="right" id="right">
            <div className="container-home">
                <h1 className="mensaje-bienvenida">Bienvenido a la escuela de manejo</h1>
                <p className="descripcion-login"><br/>Iniciar sesión</p>
                <button onClick={() => navigate("/login")}>Login</button>
                <p className="descripcion-registro">¿no estas registrado?</p>
                <button onClick={() => navigate("/registro")}>Registrarse</button>
                <p><br/></p>
            </div>
        </div>
    )
}
export default Home;