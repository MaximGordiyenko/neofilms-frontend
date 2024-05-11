import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTE } from './constants.js';

import { useSelector, useDispatch } from 'react-redux';
import { getSlides } from './store/apis/slide.api.js';
import { getMovies } from './store/apis/movie.api.js';

import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import { Layout } from './components/layouts/Layout.jsx';
import { AuthLayout } from './components/layouts/AuthLayout.jsx';

import { NavigationTabs } from './components/tabs/NavigationTabs.jsx';
import { LoginPage } from './pages/sign-in/LoginPage.jsx';
import { SlidePage } from './pages/main-slider/SlidePage.jsx';
import { CreateSlidePage } from './pages/main-slider/CreateSlidePage.jsx';
import { SliderEditPage } from './pages/main-slider/SliderEditPage.jsx';
import { AllMoviesPage } from './pages/all-movies/AllMoviesPage.jsx';
import { CreateMoviePage } from './pages/all-movies/CreateMoviePage.jsx';
import { MovieEditPage } from './pages/all-movies/MovieEditPage.jsx';
import { Web3ProjectPage } from './pages/web3-project/Web3ProjectPage.jsx';
import { ProjectEditPage } from './pages/web3-project/ProjectEditPage.jsx';
import { CalendarPage } from './pages/calendar/CalendarPage.jsx';
import { CalendarEditPage } from './pages/calendar/CalendarEditPage.jsx';
import { NoMatch } from './NoMatch.jsx';

import placeholder from './assets/slide_placeholder.png';
import { light, dark } from './theme-config.js';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {}
});


export const App = () => {
  const [tab, setTab] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [projects, setProject] = useState([{ id: uuidv4(), title: 'Project 1', image: placeholder }]);
  const [calendars, setCalendar] = useState([{ id: uuidv4(), title: 'Calendar 1', image: placeholder }]);
  
  useEffect(() => {
    dispatch(getSlides());
    dispatch(getMovies());
  }, [dispatch]);
  
  const { slides } = useSelector((state) => state?.slide);
  const { movies } = useSelector((state) => state?.movie);
  const { user } = useSelector((state) => state?.admin);
  
  const onAddProject = () => {
    const newProject = { id: uuidv4(), title: 'New Project', image: placeholder };
    setProject([...projects, newProject]);
  };
  
  const onAddCalendar = () => {
    const newCalendar = { id: uuidv4(), title: 'New Calendar', image: placeholder };
    setCalendar([...calendars, newCalendar]);
  };
  
  const onDeleteProject = (id) => {
    const updatedProject = projects.filter(card => card.id !== id);
    setProject(updatedProject);
  };
  
  const onDeleteCalendar = (id) => {
    const updatedCalendar = calendars.filter(card => card.id !== id);
    setCalendar(updatedCalendar);
  };
  
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
              <Route index element={<AllMoviesPage/>}/>
              <Route
                path={ROUTE.allMovies}
                element={
                  <AllMoviesPage
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
                    onDelete={onDeleteProject}
                    onAdd={onAddProject}
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
                    onDelete={onDeleteCalendar}
                    onAdd={onAddCalendar}
                    buttonName="Add Event"
                  />
                }
              />
            </Route>
            <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/${ROUTE.createSlide}`} element={<CreateSlidePage/>}/>
            <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/:sliderId`} element={<SliderEditPage/>}/>
            <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/${ROUTE.createMovie}`} element={<CreateMoviePage/>}/>
            <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/:movieId`} element={<MovieEditPage/>}/>
            <Route path={`${ROUTE.admin}/${ROUTE.web3project}/:projectId`} element={<ProjectEditPage/>}/>
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
