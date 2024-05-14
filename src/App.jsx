import { useState, useEffect } from 'react';

import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE } from './constants.js';

import { useSelector, useDispatch } from 'react-redux';
import { getSlides } from './store/apis/slide.api.js';
import { getMovies } from './store/apis/movie.api.js';
import { getProjects } from './store/apis/project.api.js';
import { getCalendars } from './store/apis/calendar.api.js';

import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import { Layout } from './components/layouts/Layout.jsx';
import { AuthLayout } from './components/layouts/AuthLayout.jsx';

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

const theme = createTheme({
  palette: {}
});

export const App = () => {
  const [tab, setTab] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSlides());
    dispatch(getMovies());
    dispatch(getProjects());
    dispatch(getCalendars());
  }, [dispatch]);
  
  const { user } = useSelector((state) => state?.admin);
  const { slides } = useSelector((state) => state?.slide);
  const { movies } = useSelector((state) => state?.movie);
  const { projects } = useSelector((state) => state?.project);
  const { calendars } = useSelector((state) => state?.calendar);
  
  const themeLight = createTheme(light);
  return (
    <ThemeProvider theme={responsiveFontSizes(themeLight)}>
      <Routes>
        <Route
          element={<AuthLayout/>}
          loader={() => <AuthLayout user={user}/>}>
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
              <Route index element={<SlidePage/>}/>
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
