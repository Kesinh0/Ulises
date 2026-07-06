import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Error404 from './pages/Error404.jsx'
import Login from './pages/Login.jsx'
import Estudiante from './pages/Estudiante.jsx'
import Profesor from './pages/Profesor.jsx'
//import './styles/App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error404 />
  },
  {
    path: "/estudiante",
    element: <Estudiante />
  },
  {
    path: "/profesor",
    element: <Profesor />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
