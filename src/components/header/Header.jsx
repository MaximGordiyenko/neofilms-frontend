import { useLocation } from "react-router-dom";
import { Box, Grid, styled, Typography } from "@mui/material";
import { ROUTE } from '../../router/constants.js';
// import { Logo } from "../ui/Logo";

export const Header = () => {
  const { pathname } = useLocation();
  
  return (
    <GridCSS
      opacity={pathname.includes(`/${ROUTE.login}`) ? 1 : 0}
      component="header"
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      zIndex="1"
      container>
      <Grid item xs={12} sm={4} md={9} lg={9}>
        <Typography variant="h4" align="center" color="primary">
          Neo Masterpiece Film Admin Panel
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3}>
        <Box display="flex">
          <Typography variant="h4" align="center" color="primary">
            Logout icon
          </Typography>
        </Box>
      </Grid>
    </GridCSS>
  );
};

const GridCSS = styled(Grid)(
  ({ theme, opacity }) => ({
    display: opacity ? 'none' : 'flex',
    position: 'fixed',
    top: 0
  })
);
