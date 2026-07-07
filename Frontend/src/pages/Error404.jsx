import { Link } from 'react-router-dom';
import imagen404 from '../assets/404.png';

const Error404 = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-text">
      <h1>
        404
      </h1>
      <h2>
        Página no encontrada
      </h2>
      <p>
        <br/> 
        La página que estás buscando no existe, 
        aveces hay que dejar ir de las cosas 
        que no podemos controlar.
        <br/>
        <br/> 
      </p>
      <Link to="/">Volver a la página principal</Link>
      </div>
      <img src={imagen404} alt="404" className="not-found-image" />
    </div>
  )
}

export default Error404