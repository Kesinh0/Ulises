import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>
                Home
            </h1>
            <p>
                Bienvenido a la página de inicio.
            </p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/registro")}>Registrarse</button>
        </div>
    )
}
export default Home;