import { createContext, useContext, useMemo, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTE } from '../../constants.js';

import { useSessionStorage } from "./useSessionStorage.jsx";
import { toast } from 'react-toastify';
import { adminLogin, adminCheck } from '../store/thunk/admin.api';
import { useDispatch } from 'react-redux';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, userData }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useSessionStorage("admin", userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
      const access_token = dispatch(adminCheck());
      if (access_token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        navigate('/loginpage');
      }
    })();
  }, []);

  
  const login = async (data) => {
    console.log('login:', data);
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
