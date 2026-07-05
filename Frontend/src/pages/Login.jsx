import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../styles/App.css'

function App() {

  return ( 
    <>
    <div class="right" id="right">
        <div class="forms">
            <div class="Login">
                <h1 class="Mensaje-bienvenida">Bienvenido a tu escuela de manejo</h1>
                <p class="Descripcion-login">Ingrese los detalles de tu cuenta</p>
                <form action="">
                    <div class="input-container">
                        <label for="username">Correo o Usuario</label>
                        <input type="text" placeholder="Ingresa tu usuario" name="username"/>
                        <label for="password">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu contraseña" name="password"/>
                    </div>
                    <button onclick="handleLogin()">Iniciar Sesion</button>
                </form>
            </div>   
        </div>
      </div>
    </>
  )
}

export default App
