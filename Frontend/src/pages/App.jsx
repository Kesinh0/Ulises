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
                <p class="Descripcion-login">Ingresa los detalles de tu cuenta</p>
                <form action="">
                    <div class="input-container">
                        <input type="text" placeholder="correo o usuario" />
                        <input type="password" placeholder="Contraseña" />
                    </div>
                    <button>Iniciar Sesion</button>
                </form>
            </div>   
        </div>
      </div>
    </>
  )
}

export default App
