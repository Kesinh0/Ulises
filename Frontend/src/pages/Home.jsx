import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container-home">
            <h1 className="mensaje-bienvenida">Bienvenido a la escuela de manejo</h1>
            <p className="descripcion-login">Inicie sesión o regístrese para continuar</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/registro")}>Registrarse</button>
            <p><br/></p>
        </div>
    )
}
export default Home;