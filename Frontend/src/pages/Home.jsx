import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="Mensaje-bienvenida">Bienvenido a tu escuela de manejo</h1>
            <p className="Descripcion-login">Inicie sesión o regístrese para continuar</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/registro")}>Registrarse</button>
        </div>
    )
}
export default Home;