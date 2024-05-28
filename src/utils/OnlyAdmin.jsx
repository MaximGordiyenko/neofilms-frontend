import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as adminApi from '../api/admin';

const OnlyAdmin = ({ element }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if ((await adminApi.check()).status === 200) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
          navigate('/admin/login');
        }
      } catch (error) {
        setIsLogged(false);
        navigate('/admin/login');
      }
    })();
  }, []);

  return <>{isLogged ? element : null}</>;
};

export default OnlyAdmin;
