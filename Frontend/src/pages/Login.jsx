import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function Login() {
  const navigate = useNavigate();

  return ( 
    <div className="right" id="right">
        <div className="Login">
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido nuevamente a Ulises.</p>
            <form>
                <div className="input-container">
                    <label htmlFor="email">Correo de usuario</label>
                    <input type="email" placeholder="Ingresa tu correo" name="email"/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="Ingresa tu contraseña" name="password"/>
                    <label><br/></label>
                {/*IMPLEMENTAR QUE SE GUARDEN ESTOS DATOS*/}
                </div>
                <button onClick={() => handleLogin()}>Iniciar Sesion</button> 
              {/*ESTE BOTON DEBE LLEVARNOS A LA PAGINA DEL ESTUDIANTE O PROFESOR DEPENDIENDO DEL TIPO DE USUARIO*/}
                <button onClick={() => navigate("/")}>Volver al inicio</button>
                <p><br/></p>
            </form>
        </div>   
    </div>
  )
}

export default Login
