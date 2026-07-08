import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginimg from "../assets/Login.png";
import { loadSession, login } from "../services/authService.js";
import useAuth from "../hooks/useAuth.js";

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { setUsuario } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ correo, contrasena }).then((response) => {
      if (response.success) {
        loadSession().then((sessionData) => {
          setUsuario(sessionData);

          if (sessionData.rol === "alumno") {
            navigate("/estudiante");
          } else if (sessionData.rol === "profesor") {
            navigate("/profesor");
          } else {
            navigate("/admin");
          }
        });
      }
    });
  };

  return (
    <div className="right" id="right">
      <h1>Iniciar Sesión</h1>
      <p>
        <br />
      </p>
      <div className="Login">
        <img src={loginimg} alt="loginimg" className="login-image" />
        <p>Bienvenido nuevamente a Ulises.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">
              <br />
              Correo de usuario
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              name="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <label htmlFor="password">
              <br />
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <label>
              <br />
            </label>
            {/*IMPLEMENTAR QUE SE GUARDEN ESTOS DATOS*/}
          </div>
          <button onClick={handleSubmit}>Iniciar Sesion</button>
          {/*ESTE BOTON DEBE LLEVARNOS A LA PAGINA DEL ESTUDIANTE O PROFESOR DEPENDIENDO DEL TIPO DE USUARIO*/}
          <button onClick={() => navigate("/")}>Volver al inicio</button>
          <p>
            <br />
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
