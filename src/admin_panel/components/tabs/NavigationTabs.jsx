import { Outlet, Link } from 'react-router-dom';
import { ContainerCSS } from '../ui/ui.styles.js';
import { Tabs, Tab, Box } from '@mui/material';
import { ROUTE } from '../../../constants.js';

export const NavigationTabs = ({tab, onChangeTab}) => {
  return (
    <ContainerCSS maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={onChangeTab} textColor="inherit">
          <Tab label="Latest News" component={Link} to={ROUTE.latestNews}/>
          <Tab label="All Movies" component={Link} to={ROUTE.allMovies}/>
          <Tab label="Neo NFT's" component={Link} to={ROUTE.web3project}/>
          <Tab label="Calendar" component={Link} to={ROUTE.calendar}/>
          <Tab label="Casting" component={Link} to={ROUTE.casting}/>
          <Tab label="Settings" component={Link} to={ROUTE.settings}/>
        </Tabs>
      </Box>
      <Outlet />
    </ContainerCSS>
  );
};
