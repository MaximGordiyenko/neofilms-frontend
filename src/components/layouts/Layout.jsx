import { Outlet } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { LayoutContainerCSS } from './layout.styles.js';

import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';
import { IconButton } from '../buttons/IconButton.jsx';

export const Layout = () => {
  
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
          <IconButton icon={<Logout />}>Logout icon</IconButton>
        }
      />
      <MainComponent>
        <Outlet/>
      </MainComponent>
    </LayoutContainerCSS>
  );
};
