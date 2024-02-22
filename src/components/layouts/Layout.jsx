import { Outlet } from 'react-router-dom';
import { LayoutContainerCSS } from './layout.styles.js';
// import { BackgroundImage } from '../ui/BackgroundImage.jsx';
import { Header } from '../header/Header.jsx';
import { MainComponent } from './MainComponent.jsx';

export const Layout = () => {
  return (
    <LayoutContainerCSS>
      {/*<BackgroundImage/>*/}
      <Header/>
      <MainComponent>
        <Outlet/>
      </MainComponent>
    </LayoutContainerCSS>
  );
};
