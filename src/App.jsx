import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from './constants.js';

import { useSelector, useDispatch } from 'react-redux';
import { getSlides, addSlide } from './store/sliderPageSlice.js';

import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Box from '@mui/material/Box';

import { Layout } from './components/layouts/Layout.jsx';
import { AuthLayout } from './components/layouts/AuthLayout.jsx';

import { NavigationTabs } from './components/tabs/NavigationTabs.jsx';
import { LoginPage } from './pages/sign-in/LoginPage.jsx';
import { SlidePage } from './pages/main-slider/SlidePage.jsx';
import { SliderEditPage } from './pages/main-slider/SliderEditPage.jsx';
import { AllMoviesPage } from './pages/all-movies/AllMoviesPage.jsx';
import { MovieEditPage } from './pages/all-movies/MovieEditPage.jsx';
import { Web3ProjectPage } from './pages/web3-project/Web3ProjectPage.jsx';
import { ProjectEditPage } from './pages/web3-project/ProjectEditPage.jsx';
import { CalendarPage } from './pages/calendar/CalendarPage.jsx';
import { CalendarEditPage } from './pages/calendar/CalendarEditPage.jsx';
import { NoMatch } from './NoMatch.jsx';

import placeholder from './assets/slide_placeholder.png';
import { light, dark } from './theme-config.js';
import './App.css';

const theme = createTheme({
  palette: {}
});

export const AdminTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 10 }}>{children}</Box>
      )}
    </div>
  );
};

export const App = () => {
  const [tab, setTab] = useState(0);
  const [sliders, setSlider] = useState();
  const [movies, setMovie] = useState([{ id: uuidv4(), title: 'Movie 1', image: placeholder }]);
  const [projects, setProject] = useState([{ id: uuidv4(), title: 'Project 1', image: placeholder }]);
  const [calendars, setCalendar] = useState([{ id: uuidv4(), title: 'Calendar 1', image: placeholder }]);
  
  const dispatch = useDispatch();
  
  const { data } = useSelector((state) => state?.slide);
  console.log(data);
  
  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);
  
  const onAddMovie = () => {
    const newMovie = { id: uuidv4(), title: 'New Movie', image: placeholder };
    setMovie([...movies, newMovie]);
  };
  
  const onAddProject = () => {
    const newProject = { id: uuidv4(), title: 'New Project', image: placeholder };
    setProject([...projects, newProject]);
  };
  
  const onAddCalendar = () => {
    const newCalendar = { id: uuidv4(), title: 'New Calendar', image: placeholder };
    setCalendar([...calendars, newCalendar]);
  };
  
  const onDeleteSlide = (id) => {
    const updatedCards = sliders?.filter(card => card.id !== id);
    setSlider(updatedCards);
  };
  
  const onDeleteMovie = (id) => {
    const updatedMovie = movies.filter(card => card.id !== id);
    setMovie(updatedMovie);
  };
  
  const onDeleteProject = (id) => {
    const updatedProject = projects.filter(card => card.id !== id);
    setProject(updatedProject);
  };
  
  const onDeleteCalendar = (id) => {
    const updatedCalendar = calendars.filter(card => card.id !== id);
    setCalendar(updatedCalendar);
  };
  
  const getUserData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        const user = window.localStorage.getItem("user");
        resolve(user);
      }, 3000)
    );
  
  const themeLight = createTheme(light);
  return (
    <ThemeProvider theme={responsiveFontSizes(themeLight)}>
      <BrowserRouter>
        <Routes>
          <Route
            element={<AuthLayout/>}
            loader={() => <AuthLayout user={getUserData()} />}>
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
                      cards={data}
                      onDelete={onDeleteSlide}
                      onAdd={() => dispatch(addSlide())}
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
                      onDelete={onDeleteMovie}
                      onAdd={onAddMovie}
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
                <Route path="*" element={<NoMatch/>}/>
              </Route>
              <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/:sliderId`} element={<SliderEditPage/>}/>
              <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/:movieId`} element={<MovieEditPage/>}/>
              <Route path={`${ROUTE.admin}/${ROUTE.web3project}/:projectId`} element={<ProjectEditPage/>}/>
              <Route path={`${ROUTE.admin}/${ROUTE.calendar}/:calendarId`} element={<CalendarEditPage/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
