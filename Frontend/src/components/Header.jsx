import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";
import useAuth from "../hooks/useAuth.js";

function Header() {
    const navigate = useNavigate();
    const { setUsuario } = useAuth();

    if(!usuario) return null;

    const handleLogout = async () => {
        await logout();
        setUsuario(null);
        navigate("/");
    };

    return (
        <header className="app-header">
            <button onClick={() => navigate("/")}>Volver al inicio</button>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </header>
    );
}

export default Header;