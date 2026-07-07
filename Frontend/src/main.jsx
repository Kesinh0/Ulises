import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Error404 from "./pages/Error404.jsx";
import Login from "./pages/Login.jsx";
import Estudiante from "./pages/Estudiante.jsx";
import inscripciones from "./pages/Inscripciones.jsx";
import Profesor from "./pages/Profesor.jsx";
import Home from "./pages/Home.jsx";
import Registro from "./pages/Registro.jsx";
import Terminos from "./pages/terminos.jsx";
import Admin from "./pages/Administracion.jsx";
import "./styles/App.css";
import AuthProvider from "./contexts/auth/Auth.provider.jsx";
//AGREGAR DECORACION AL FINAL

{
  /*HAY QUE IMPLEMENTAR DE QUE NO TE DEJE METERTE A LAS OTRAS PAGINAS SI NO ESTAS LOGUEADO*/
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registro",
        element: <Registro />,
      },
      {
        path: "/estudiante",
        element: <Estudiante />,
      },
      {
        path: "/profesor",
        element: <Profesor />,
      },
      {
        path: "/terminos",
        element: <Terminos />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/inscripciones",
        element: <inscripciones />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
