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
import RutaProtegida from "./components/RutaProtegida.jsx";
//AGREGAR DECORACION AL FINAL

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
        element: (
          <RutaProtegida rol="alumno">
            <Estudiante />
          </RutaProtegida>
        ),
      },
      {
        path: "/profesor",
        element: (
          <RutaProtegida rol="profesor">
            <Profesor />
          </RutaProtegida>
        ),
      },
      {
        path: "/terminos",
        element: <Terminos />,
      },
      {
        path: "/admin",
        element: (
          <RutaProtegida rol="admin">
            <Admin />
          </RutaProtegida>
        ),
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
