import { useState, useEffect } from 'react';

import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE } from './constants.js';

import { useSelector, useDispatch } from 'react-redux';

import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import { Layout } from './components/layouts/Layout.jsx';

import { NavigationTabs } from './components/tabs/NavigationTabs.jsx';
import { LoginPage } from './pages/sign-in/LoginPage.jsx';

import { SlidePage } from './pages/main-slider/SlidePage.jsx';
import { CreateSlidePage } from './pages/main-slider/CreateSlidePage.jsx';
import { SliderEditPage } from './pages/main-slider/SliderEditPage.jsx';

import { MoviesPage } from './pages/all-movies/MoviesPage.jsx';
import { CreateMoviePage } from './pages/all-movies/CreateMoviePage.jsx';
import { MovieEditPage } from './pages/all-movies/MovieEditPage.jsx';

import { Web3ProjectPage } from './pages/web3-project/Web3ProjectPage.jsx';
import { CreateProjectPage } from './pages/web3-project/CreateProjectPage.jsx';
import { ProjectEditPage } from './pages/web3-project/ProjectEditPage.jsx';

import { CalendarPage } from './pages/calendar/CalendarPage.jsx';
import { CreateCalendarPage } from './pages/calendar/CreateCalendarPage.jsx';
import { CalendarEditPage } from './pages/calendar/CalendarEditPage.jsx';

import { NoMatch } from './NoMatch.jsx';

import { light, dark } from './theme-config.js';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OnlyAdmin } from './pages/sign-in/OnlyAdmin';
import { PrivateRoute } from './pages/sign-in/PrivateRoute';
import { adminCheck } from './store/apis/admin.api';
import { useSessionStorage } from './hooks/useSessionStorage';

const theme = createTheme({
  palette: {}
});

export const App = () => {
  const [tab, setTab] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { status, loading, error } = useSelector((state) => state.admin);
  const { slides } = useSelector((state) => state?.slide);
  const { movies } = useSelector((state) => state?.movie);
  const { projects } = useSelector((state) => state?.project);
  const { calendars } = useSelector((state) => state?.calendar);
  console.log(status, loading, error);
  const themeLight = createTheme(light);
  const [isLogged, setIsLogged] = useState(false);
  
  useEffect(() => {
    (async () => {
      const access = await dispatch(adminCheck());
      if (access === 200) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        navigate('/login');
      }
    })();
  }, []);
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeLight)}>
      <Routes>
        <Route path={ROUTE.login} element={<LoginPage/>}/>
        <Route element={<Layout/>}>
          <Route
            path={ROUTE.admin}
            element={
              <NavigationTabs
                tab={tab}
                onChangeTab={(event, newValue) => setTab(newValue)}
              />
            }>
            {/*<Route index element={<SlidePage/>}/>*/}
            <Route index element={<PrivateRoute element={SlidePage} isAuthenticated={isLogged} />} />
            <Route
              path={ROUTE.mainSlider}
              element={
                <SlidePage
                  tab={tab}
                  cards={slides}
                  onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}/${ROUTE.createSlide}`)}
                  buttonName="Add Slide"
                />
              }/>
            <Route index element={<MoviesPage/>}/>
            <Route
              path={ROUTE.allMovies}
              element={
                <MoviesPage
                  tab={tab}
                  cards={movies}
                  onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.allMovies}/${ROUTE.createMovie}`)}
                  buttonName="Add Movie"
                />
              }
            />
            <Route index element={<Web3ProjectPage/>}/>
            <Route
              path={ROUTE.web3project}
              element={
                <Web3ProjectPage
                  tab={tab}
                  cards={projects}
                  onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.web3project}/${ROUTE.createProject}`)}
                  buttonName="Add Project"
                />
              }
            />
            <Route index element={<CalendarPage/>}/>
            <Route
              path={ROUTE.calendar}
              element={
                <CalendarPage
                  tab={tab}
                  cards={calendars}
                  onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.calendar}/${ROUTE.createCalendar}`)}
                  buttonName="Add Event"
                />
              }
            />
          </Route>
          <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/${ROUTE.createSlide}`} element={<CreateSlidePage/>}/>
          <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/:sliderId`} element={<SliderEditPage/>}/>
          
          <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/${ROUTE.createMovie}`} element={<CreateMoviePage/>}/>
          <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/:movieId`} element={<MovieEditPage/>}/>
          
          <Route path={`${ROUTE.admin}/${ROUTE.web3project}/${ROUTE.createProject}`} element={<CreateProjectPage/>}/>
          <Route path={`${ROUTE.admin}/${ROUTE.web3project}/:projectId`} element={<ProjectEditPage/>}/>
          
          <Route path={`${ROUTE.admin}/${ROUTE.calendar}/${ROUTE.createCalendar}`} element={<CreateCalendarPage/>}/>
          <Route path={`${ROUTE.admin}/${ROUTE.calendar}/:calendarId`} element={<CalendarEditPage/>}/>
        </Route>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        theme="colored"
      />
    </ThemeProvider>
  );
};
