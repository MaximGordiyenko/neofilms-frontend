import { createBrowserRouter, Outlet } from "react-router-dom";
import { Layout } from '../components/layouts/Layout.jsx';
import { ROUTE } from './constants.js';
import { LoginPage } from '../pages/sign-in/LoginPage.jsx';
import { Admin } from '../pages/admin/Admin.jsx';
import { MainSliderPage } from '../pages/main-slider/MainSliderPage.jsx';
import { AllMoviesPage } from '../pages/all-movies/AllMoviesPage.jsx';
import { Web3ProjectPage } from '../pages/web3-project/Web3ProjectPage.jsx';
import { CalendarPage } from '../pages/calendar/CalendarPage.jsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: ROUTE.login,
        element: <LoginPage/>
      },
      // {
      //   path: ROUTE.admin,
      //   element: <Admin children={<Outlet/>} />,
      //   children: [
          {
            path: ROUTE.admin,
            element: <Admin/>
          },
          {
            path: `${ROUTE.admin}/${ROUTE.mainSlider}`,
            element: <MainSliderPage/>
          },
          {
            path: ROUTE.allMovies,
            element: <AllMoviesPage/>
          },
          {
            path: ROUTE.web3project,
            element: <Web3ProjectPage/>
          },
          {
            path: ROUTE.calendar,
            element: <CalendarPage/>
          },
      //   ]
      // }
    ]
  }
]);
