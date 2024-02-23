import { Outlet, Link } from 'react-router-dom';
import { ContainerCSS } from '../ui/ui.styles.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ROUTE } from '../../constants.js';

export const NavigationTabs = ({tab, onChangeTab}) => {
  return (
    <ContainerCSS maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={onChangeTab} textColor="inherit">
          <Tab label="Main Slider" component={Link} to={ROUTE.mainSlider}/>
          <Tab label="All Movies" component={Link} to={ROUTE.allMovies}/>
          <Tab label="Web3 Projects" component={Link} to={ROUTE.web3project}/>
          <Tab label="Calendar" component={Link} to={ROUTE.calendar}/>
        </Tabs>
      </Box>
      <Outlet />
    </ContainerCSS>
  );
};
