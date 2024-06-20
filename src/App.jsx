// sharing imports
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// user frontend imports
import './App.scss';
import { HomePage } from './website/pages/home/HomePage';
import { Live } from './website/pages/live/Live';
import { AllMovies } from './website/pages/allMovies/AllMovies';
import FilmDetails from './website/pages/filmDetails/FilmDetails';
import { AboutPage } from './website/pages/about/AboutPage';
import { UnderConstruction } from './website/pages/underConstruction/SoonPage';
import { News } from './website/pages/news/News';
import { Services } from './website/pages/services/Services';
import { NeoNft } from './website/pages/web3/neoNFT/NeoNft';
import { NeoStaking } from './website/pages/web3/stake/Stake';
import { Redeem } from './website/pages/web3/redeem/Redeem';
import { Contact } from './website/pages/contact/Contact';
import { Casting } from './website/pages/casting/Casting';
import { CastFilmPage } from './website/pages/castFilmDetails/CastFilmPage';

// admin panel imports
import { useState } from 'react';
import { ROUTE } from './constants.js';
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { Layout } from './admin_panel/components/layouts/Layout.jsx';
import { NavigationTabs } from './admin_panel/components/tabs/NavigationTabs.jsx';
import { LoginPage } from './admin_panel/pages/sign-in/LoginPage.jsx';
import { SlidePage } from './admin_panel/pages/main-slider/SlidePage.jsx';
import { CreateSlidePage } from './admin_panel/pages/main-slider/CreateSlidePage.jsx';
import { SliderEditPage } from './admin_panel/pages/main-slider/SliderEditPage.jsx';
import { MoviesPage } from './admin_panel/pages/all-movies/MoviesPage.jsx';
import { CreateMoviePage } from './admin_panel/pages/all-movies/CreateMoviePage.jsx';
import { MovieEditPage } from './admin_panel/pages/all-movies/MovieEditPage.jsx';
import { Web3ProjectPage } from './admin_panel/pages/web3-project/Web3ProjectPage.jsx';
import { CreateProjectPage } from './admin_panel/pages/web3-project/CreateProjectPage.jsx';
import { ProjectEditPage } from './admin_panel/pages/web3-project/ProjectEditPage.jsx';
import { CalendarPage } from './admin_panel/pages/calendar/CalendarPage.jsx';
import { CreateCalendarPage } from './admin_panel/pages/calendar/CreateCalendarPage.jsx';
import { CalendarEditPage } from './admin_panel/pages/calendar/CalendarEditPage.jsx';
import { NoMatch } from './NoMatch.jsx';
import { light, dark } from './theme-config.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnlyAdmin from './utils/OnlyAdmin';
import { CreateCastingPage } from './admin_panel/pages/casting/CreateCastingPage';
import { CastingEditPage } from './admin_panel/pages/casting/CastingEditPage';
import { CastingPage } from './admin_panel/pages/casting/CastingPage';
import { adminLogout } from './admin_panel/store/thunk/admin.api';

const theme = createTheme({
  palette: {}
});

export const App = () => {
  const themeLight = createTheme(light);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const { slides } = useSelector((state) => state?.slide);
  const { movies } = useSelector((state) => state?.movie);
  const { projects } = useSelector((state) => state?.project);
  const { calendars } = useSelector((state) => state?.calendar);
  const { castings } = useSelector((state) => state?.casting);
  
  const logout = async () => {
    await dispatch(adminLogout());
    navigate(`/${ROUTE.admin}/${ROUTE.login}`)
  }
  
  return (
    <ThemeProvider theme={responsiveFontSizes(themeLight)}>
      <Routes>
        {/* user frontend routes */}
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/live'} element={<Live/>}/>
        <Route path={'/about'} element={<AboutPage/>}/>
        <Route path={'/all_movies'} element={<AllMovies/>}/>
        <Route path={'/soon'} element={<UnderConstruction/>}/>
        <Route path={'/news'} element={<News/>}/>
        <Route path={'/shop'} element={<UnderConstruction/>}/>
        <Route path={'/services'} element={<Services/>}/>
        {/*<Route path={'/web3'} element={<UnderConstruction />} />*/}
        <Route path={'/web3/neo-nft'} element={<NeoNft/>}/>
        <Route path={'/web3/stake'} element={<NeoStaking/>}/>
        <Route path={'/casting'} element={<Casting/>}/>
        <Route path={'/web3/redeem'} element={<Redeem/>}/>
        <Route path={'/contacts'} element={<Contact/>}/>
        <Route path={'/film-details/:id'} element={<FilmDetails/>}/>
        <Route path={'/cast-film-details/:casting_id'} element={<CastFilmPage />} />
        {/* admin panel routes */}
        <Route path={`/${ROUTE.admin}/${ROUTE.login}`} element={<LoginPage/>}/>
        <Route element={<Layout logout={logout}/>}>
          <Route
            path={ROUTE.admin}
            element={
              <NavigationTabs
                tab={tab}
                onChangeTab={(event, newValue) => setTab(newValue)}
              />
            }>
            <Route index element={<SlidePage/>}/>
            <Route path={ROUTE.mainSlider} element={<OnlyAdmin element={
              <SlidePage
                tab={tab}
                cards={slides}
                onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}/${ROUTE.createSlide}`)}
                buttonName="Add Slide"
              />
            }/>
            }/>
            <Route index element={<MoviesPage/>}/>
            <Route path={ROUTE.allMovies} element={<OnlyAdmin element={
              <MoviesPage
                tab={tab}
                cards={movies}
                onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.allMovies}/${ROUTE.createMovie}`)}
                buttonName="Add Movie"
              />
            }/>
            }/>
            <Route index element={<Web3ProjectPage/>}/>
            <Route path={ROUTE.web3project} element={<OnlyAdmin element={
              <Web3ProjectPage
                tab={tab}
                cards={projects}
                onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.web3project}/${ROUTE.createProject}`)}
                buttonName="Add Project"
              />
            }/>
            }/>
            <Route index element={<CalendarPage/>}/>
            <Route path={ROUTE.calendar} element={<OnlyAdmin element={
              <CalendarPage
                tab={tab}
                cards={calendars}
                onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.calendar}/${ROUTE.createCalendar}`)}
                buttonName="Add Event"
              />
            }/>
            }/>
            <Route index element={<CastingPage/>}/>
            <Route
              path={ROUTE.casting}
              element={
                <CastingPage
                  tab={tab}
                  cards={castings}
                  onAdd={() => navigate(`/${ROUTE.admin}/${ROUTE.casting}/${ROUTE.createCasting}`)}
                  buttonName="Add Casting"
                />
              }
            />
          </Route>
          <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/${ROUTE.createSlide}`}
                 element={<OnlyAdmin
                   element={<CreateSlidePage/>}/>}
          />
          <Route path={`${ROUTE.admin}/${ROUTE.mainSlider}/:sliderId`}
                 element={<OnlyAdmin
                   element={<SliderEditPage/>}/>}
          />
          
          <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/${ROUTE.createMovie}`}
                 element={<OnlyAdmin
                   element={<CreateMoviePage/>}/>}
          />
          <Route path={`${ROUTE.admin}/${ROUTE.allMovies}/:movieId`}
                 element={<OnlyAdmin
                   element={<MovieEditPage/>}/>}
          />
          
          <Route path={`${ROUTE.admin}/${ROUTE.web3project}/${ROUTE.createProject}`}
                 element={<OnlyAdmin
                   element={<CreateProjectPage/>}/>}
          />
          <Route path={`${ROUTE.admin}/${ROUTE.web3project}/:projectId`}
                 element={<OnlyAdmin
                   element={<ProjectEditPage/>}/>}
          />
          
          <Route path={`${ROUTE.admin}/${ROUTE.calendar}/${ROUTE.createCalendar}`}
                 element={<OnlyAdmin
                   element={<CreateCalendarPage/>}/>}
          />
          <Route path={`${ROUTE.admin}/${ROUTE.calendar}/:calendarId`}
                 element={<OnlyAdmin
                   element={<CalendarEditPage/>}/>}
          />

          <Route path={`${ROUTE.admin}/${ROUTE.casting}/${ROUTE.createCasting}`}
                 element={<OnlyAdmin
                   element={<CreateCastingPage/>}/>}
          />
          <Route path={`${ROUTE.admin}/${ROUTE.casting}/:castingId`}
                 element={<OnlyAdmin
                   element={<CastingEditPage/>}/>}
          />
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
