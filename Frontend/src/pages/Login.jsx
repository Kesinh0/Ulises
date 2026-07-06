import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function Login() {
  const navigate = useNavigate();

  return ( 
    <>
    <div class="right" id="right">
        <div class="forms">
            <div class="Login">
                <form action="">
                    <div className="input-container">
                        <label htmlFor="username">Correo o Usuario</label>
                        <input type="text" placeholder="Ingresa tu usuario" name="username"/>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" name="password"/>
                    {/*IMPLEMENTAR QUE SE GUARDEN ESTOS DATOS*/}
                    </div>
                    <button onClick={() => handleLogin()}>Iniciar Sesion</button> 
                  {/*ESTE BOTON DEBE LLEVARNOS A LA PAGINA DEL ESTUDIANTE O PROFESOR DEPENDIENDO DEL TIPO DE USUARIO*/}
                </form>
                <button className="volver-inicio" onClick={() => navigate("/")}>Volver al inicio</button>
            </div>   
        </div>
      </div>
    </>
  )
}

export default Login
