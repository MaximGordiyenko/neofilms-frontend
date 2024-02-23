import { Outlet, useLocation } from 'react-router-dom';
import { LayoutContainerCSS } from './layout.styles.js';
import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Delete, DownloadDone } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ROUTE } from '../../constants.js';

export const Layout = () => {
  const { pathname } = useLocation();
  
  return (
    <LayoutContainerCSS>
      <Header
        leftContent={
          <Typography variant="h4" align="center" color="primary">
            Neo Masterpiece Film Admin Panel
          </Typography>}
        rightContent={
          <Typography variant="h4" align="center" color="primary">
            Logout icon
          </Typography>
        }
      />
      <Header
        leftContent={
          <Typography variant="h4" align="left" color="primary">
            Admin Panel
          </Typography>}
        rightContent={
          pathname.includes(`/${ROUTE.admin}`) ? '' :
            <Box display="flex" justifyContent="space-between" width={220}>
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
              }}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<DownloadDone/>}>
                Save
              </Button>
            </Box>
        }
      />
      <MainComponent>
        <Outlet/>
      </MainComponent>
    </LayoutContainerCSS>
  );
};
