import axios from "./rootService.js";
import cookies from "js-cookie";

export async function login(dataUser) {
  try {
    const { correo, contrasena } = dataUser;
    const response = await axios.post("/auth/login", {
      correo,
      contrasena,
    });

    const { token, user } = response.data.data;

    cookies.set("jwt-auth", token, { path: "/" });
    sessionStorage.setItem("usuario", JSON.stringify(user));

    return response.data;
  } catch (error) {
    return (
      error.response?.data || { message: "Error al conectar con el servidor" }
    );
  }
}

export async function register(data) {
  try {
    const { correo, contrasena, nombre } = data;
    const response = await axios.post("/usuarios", {
      nombre,
      correo,
      contrasena,
      rol:"alumno",
    });
    return {success:true, data: response.data};

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al conectar con el servidor",
    };
  }
}

export async function logout() {
  try {
    sessionStorage.removeItem("usuario");
    cookies.remove("jwt-auth");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

export async function loadSession() {
  try {
    const token = cookies.get("jwt-auth", { path: "/" });
    if (!token) {
      return null;
    }

    const response = await axios.get("/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data.data;
    sessionStorage.setItem("usuario", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error al cargar la sesión:", error);
    return null;
  }
}
