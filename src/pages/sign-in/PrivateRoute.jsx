import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};
