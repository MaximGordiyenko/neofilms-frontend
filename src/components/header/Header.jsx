import { useLocation } from "react-router-dom";
import { Box, Grid, styled } from "@mui/material";
import { ROUTE } from '../../constants.js';
// import { Logo } from "../ui/Logo";

export const Header = ({ leftContent, rightContent}) => {
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
        {leftContent}
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={3}>
        <Box display="flex">
          {rightContent}
        </Box>
      </Grid>
    </GridCSS>
  );
};

const GridCSS = styled(Grid)(
  ({ theme, opacity }) => ({
    display: opacity ? 'none' : 'flex',
    position: 'static',
    top: 0
  })
);
