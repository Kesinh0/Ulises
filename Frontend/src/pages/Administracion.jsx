import { useNavigate } from "react-router-dom";
import admin from "../assets/Admin.png";

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className="right" id="right">
            <h1>
                Secretaria
            </h1>

            <div className="Admin">
                <img src={admin} alt="admin" className="admin-image"/>
                <p>
                    Bienvenido 
                </p>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        </div>
    )
}

export default Admin