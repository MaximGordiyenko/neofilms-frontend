import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("admin", userData);
  const navigate = useNavigate();
  
  const login = async (data) => {
    setUser(data);
    navigate("/admin/main-slider", { replace: true });
  };
  
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };
  
  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
