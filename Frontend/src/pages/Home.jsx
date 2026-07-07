import { useNavigate } from "react-router-dom";
import home from "../assets/Home.png"
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="right" id="right">
            <div className="container-home">
                <h1 className="mensaje-bienvenida">Bienvenido a la escuela de manejo</h1>
                <img src={home} alt="home" className="home-image"/>
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