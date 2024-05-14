import { Suspense } from "react";
import { useOutlet } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { AuthProvider } from '../../hooks/useAuth.jsx';

export const AuthLayout = ({user}) => {
  const outlet = useOutlet();
  
  return (
    <Suspense fallback={<LinearProgress />}>
      <AuthProvider userData={user}>{outlet}</AuthProvider>
    </Suspense>
  );
};
