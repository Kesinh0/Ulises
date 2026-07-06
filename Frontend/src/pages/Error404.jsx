import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div>
      <h1>
        404
      </h1>
      <h2>
        Página no encontrada
      </h2>
      <p>
        La página que estás buscando no existe.
      </p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  )
}

export default Error404