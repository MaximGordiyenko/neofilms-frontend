import { createContext, useContext, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTE } from '../constants.js';

import { useSessionStorage } from "./useSessionStorage.jsx";
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useSessionStorage("admin", userData);
  const navigate = useNavigate();
  
  const login = async (data) => {
    if (!data.error) {
      setUser(data.login);
      navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`, { replace: true });
    } else {
      toast.error(`${data.error}`);
    }
  };
  
  const logout = () => {
    setUser(null);
    navigate(`/${ROUTE.login}`, { replace: true });
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
