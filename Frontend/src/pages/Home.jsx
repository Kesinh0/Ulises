import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 class="Mensaje-bienvenida">Bienvenido a tu escuela de manejo</h1>
                <p class="Descripcion-login">Inicie sesión o regístrese para continuar</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/registro")}>Registrarse</button>
        </div>
    )
}
export default Home;