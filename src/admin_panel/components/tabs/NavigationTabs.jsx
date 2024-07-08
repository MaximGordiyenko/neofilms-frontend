import { Outlet, Link } from 'react-router-dom';
import { ContainerCSS } from '../ui/ui.styles.js';
import { Tabs, Tab, Box } from '@mui/material';
import { ROUTE } from '../../../constants.js';

export const NavigationTabs = ({tab, onChangeTab}) => {
  return (
    <ContainerCSS maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={onChangeTab} textColor="inherit">
          <Tab label="All Movies" component={Link} to={ROUTE.allMovies}/>
          <Tab label="Web3 Projects" component={Link} to={ROUTE.web3project}/>
          <Tab label="Calendar" component={Link} to={ROUTE.calendar}/>
          <Tab label="Casting" component={Link} to={ROUTE.casting}/>
        </Tabs>
      </Box>
      <Outlet />
    </ContainerCSS>
  );
};
