import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminCheck } from '../admin_panel/store/thunk/admin.api';

const OnlyAdmin = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, loading, error } = useSelector((state) => state.admin);
  
  useEffect(() => {
    if (!loading && !status) {
      dispatch(adminCheck());
    }
  }, [dispatch, loading, status]);
  
  useEffect(() => {
    if (error || (status && status !== 200)) {
      navigate('/admin/login');
    }
  }, [error, navigate, status]);
  
  return <>{status === 200 ? element : null}</>;
};

export default OnlyAdmin;
