import { useState, useEffect } from "react";
import AuthContext from "./Auth.context.js";
import { loadSession } from "../../services/authService.js";

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setCargando(true);

      try {
        const sessionData = await loadSession();
        if (sessionData) {
          setUsuario(sessionData);
        }
      } finally {
        setCargando(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, cargando, setCargando }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
