import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { adminCheck } from '../../store/apis/admin.api';

export const OnlyAdmin = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
    const access = await dispatch(adminCheck());
    if (access === 200) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      navigate('/login');
    }
    })();
  }, []);
  
  
  return <>{isLogged ? children : null}</>;
};
