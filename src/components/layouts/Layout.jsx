import { Outlet } from 'react-router-dom';
import { LayoutContainerCSS } from './layout.styles.js';
import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';
import { Typography } from '@mui/material';

export const Layout = () => {
  
  return (
    <LayoutContainerCSS>
      <Header
        leftContent={
          <Typography variant="h4" align="center" color="primary">
            Neo Masterpiece Film Admin Panel
          </Typography>
        }
        rightContent={
          <Typography variant="h4" align="center" color="primary">
            Logout icon
          </Typography>
        }
      />
      <Typography variant="h4" align="left" color="primary" position="relative">
        Admin Panel
      </Typography>
      <MainComponent>
        <Outlet/>
      </MainComponent>
    </LayoutContainerCSS>
  );
};
