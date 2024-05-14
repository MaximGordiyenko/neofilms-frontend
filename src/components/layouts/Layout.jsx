import { Outlet, useOutlet, Navigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { LayoutContainerCSS } from './layout.styles.js';

import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';
import { IconButton } from '../buttons/IconButton.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

export const Layout = () => {
  const { user, logout } = useAuth();
  const outlet = useOutlet();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <LayoutContainerCSS>
      <Header
        leftContent={
          <Typography variant="h4" align="left" color="secobdary">
            Neo Masterpiece Film
            <Typography variant="overline" align="center" color="secobdary"> Admin Panel</Typography>
          </Typography>
        }
        rightContent={
          <IconButton icon={<Logout />} onClick={logout}>Logout icon</IconButton>
        }
      />
      <MainComponent>
        {outlet}
      </MainComponent>
    </LayoutContainerCSS>
  );
};
