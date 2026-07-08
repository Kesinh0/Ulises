import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RutaProtegida({ children, rol }) {
  const { usuario, cargando } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!cargando) {
      if (!usuario) {
        navigate("/login");
      } else if (rol && usuario.rol !== rol) {
        navigate("/login");
      }
    }
  }, [usuario, cargando, navigate, rol]);

  return cargando ? <div>Cargando...</div> : children;
}
