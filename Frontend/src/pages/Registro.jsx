const Registro = () => {
    return (
        <div className="registro-container">
            <h1>Registro</h1>
            <p>Bienvenido a la página de registro.</p>
            <form>
                <div className="input-container">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" placeholder="Ingresa tu correo electrónico" name="email" />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="Ingresa tu contraseña" name="password" />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;