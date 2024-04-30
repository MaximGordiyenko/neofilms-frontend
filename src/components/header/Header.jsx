import { useLocation } from "react-router-dom";
import { Box, Grid, styled } from "@mui/material";
import { ROUTE } from '../../constants.js';

export const Header = ({ leftContent, rightContent }) => {
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
      <Grid item xs={12} sm={4} md={9} lg={10}>
        {leftContent}
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ display: "flex", justifyContent: "end" }}>
        {rightContent}
      </Grid>
    </GridCSS>
  );
};

const GridCSS = styled(Grid)(
  ({ theme, opacity }) => ({
    display: 'flex',
    position: 'static',
    top: 0,
    background: 'white',
    padding: 20,
    boxShadow: '0px 3px 15px rgba(100, 100, 100, 0.49)'
  })
);
