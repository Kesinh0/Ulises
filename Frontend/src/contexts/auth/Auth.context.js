import { createContext } from "react";

const AuthContext = createContext({
  usuario: null,
  setUsuario: () => {},
  cargando: false,
  setCargando: () => {},
});

export default AuthContext;
