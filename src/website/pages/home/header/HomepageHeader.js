import upperDots from '../../../assets/images/image 16.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import downDots from '../../../assets/images/image 18.svg';
import './style.scss';
import Header from '../../../components/header/Header';
import videoBg from '../../../assets/images/HeroVid10 (1).mp4';
import { Button } from '../../../components/button/Button';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { useState } from 'react';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import './glitch.css';
import { useNavigate } from 'react-router-dom';

export const HomepageHeader = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  const GlitchText = () => {
    return (
      <ul className="glitch" style={{ textAlign: 'center' }}>
        <li>
          <a href="#" style={{ fontSize: '32px' }}>
            The
          </a>
        </li>
        <li>
          <a href="#" style={{ fontSize: '128px', textAlign: 'center' }}>
            Maestro
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div className={'homepage-header-box'}>
      <img src={upperDots} alt={'up-dots'} className={'up-dots'} />
      <Header />
      <video
        autoPlay
        playsInline={true}
        muted
        loop
        preload={!isMobile && 'auto'}
        className={'video'}>
        <source src={videoBg} />
      </video>
      {isMobile ? (
        <div className={'poster-container'}>
          <div className={'home-title'}>
            <h1>The</h1>
            <h1>Future Of</h1>
            <h1>Filmmaking</h1>
          </div>
          <a href={'https://vimeo.com/user109067760/review/913360625/0f57eb2d22'}>
            <Button text={'watch reel'} width={'250px'} />
          </a>
        </div>
      ) : (
        <div className={'poster-container'}>
          <div className={'home-title'}>
            <h1>The Future</h1>
            <h1>Of Filmmaking</h1>
          </div>
          <a href={'https://vimeo.com/user109067760/review/913360625/0f57eb2d22'}>
            <Button text={'watch reel'} width={'250px'} />
          </a>
        </div>
      )}
      <div className={'navbar-box'}>
        {/*<img src={tabbar} alt={'home-page-tabs'} className={'tabs-bar-home'} />*/}
      </div>
      {isMobile ? (
        <div className={'menu-mob-wrapper'}>
          <img
            src={menuMobile}
            className={'sidebar-mob-btn'}
            onClick={handleOpenMobMenu}
            alt={'menuMob-hp'}
          />
        </div>
      ) : (
        <Navbar />
      )}
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      <img src={downDots} alt={'up-dots'} className={'down-dots'} />
      {/*<div className={'linear-bg'} />*/}
    </div>
  );
};
