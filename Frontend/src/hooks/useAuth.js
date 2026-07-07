import { useContext } from "react";
import AuthContext from "../contexts/auth/Auth.context.js";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
