import { useNavigate } from "react-router-dom";
import { useState } from 'react'


function Login() {
  const navigate = useNavigate();

  return ( 
    <>
    <div class="right" id="right">
        <div class="forms">
            <div class="Login">
                <h1>Iniciar Sesión</h1>
                <p>Bienvenido de nuevo a Ulises.</p>
                <form action="">
                    <div className="input-container">
                        <label htmlFor="Email">Correo de usuario</label>
                        <input type="email" placeholder="Ingresa tu correo" name="Email"/>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" name="password"/>
                        <p><br/></p>
                    {/*IMPLEMENTAR QUE SE GUARDEN ESTOS DATOS*/}
                    </div>
                    <button onClick={() => handleLogin()}>Iniciar Sesion</button> 
                  {/*ESTE BOTON DEBE LLEVARNOS A LA PAGINA DEL ESTUDIANTE O PROFESOR DEPENDIENDO DEL TIPO DE USUARIO*/}
                    <button onClick={() => navigate("/")}>Volver al inicio</button>
                    <p><br/></p>
                </form>
            </div>   
        </div>
      </div>
    </>
  )
}

export default Login
