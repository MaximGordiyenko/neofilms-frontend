import { useOutlet } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { LayoutContainerCSS } from './layout.styles.js';
import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';
import { IconButton } from '../buttons/IconButton.jsx';

export const Layout = ({logout}) => {
  const outlet = useOutlet();
  
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
          <IconButton
            icon={<Logout/>}
            onClick={logout}>
            Log out
          </IconButton>
        }
      />
      <MainComponent>
        {outlet}
      </MainComponent>
    </LayoutContainerCSS>
  );
};
