import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes, } from "@mui/material/styles";
import { light } from './theme-config.js';
import { routes } from "./router/routes";
import './App.css';

const theme = createTheme({
  palette: {},
});

export const App = () => {
  
  const themeLight = createTheme(light);
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeLight)}>
      <RouterProvider router={routes}/>
    </ThemeProvider>
  );
};
