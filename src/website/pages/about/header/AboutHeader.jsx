import Header from '../../../components/header/Header';
import { Navbar } from '../../../components/navbar/Navbar';
import updots from '../../../assets/images/image 16.svg';
import downDots from '../../../assets/images/image 18.svg';
import symbols from '../../../assets/images/ネオ.svg';
import xDots from '../../../assets/images/x-head-about.svg';
import dots from '../../../assets/images/circles-head-about.svg';
import './style.scss';
import menuMobile from '../../../assets/images/burger-menu.svg';
import background from '../../../assets/images/about-bg.jpg';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import { useState } from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export const AboutHeader = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'about-header-wrapper'}>
      <img src={updots} alt={'about-up-dots'} className={'up-dots'} />
      <LazyLoadImage src={background} wrapperClassName='about-header-box' effect='blur'/>
      <Header />
      <div className={'about-content'}>
        <img src={dots} alt={'about-dots'} className={'about-h-dots'} />
        <img src={symbols} alt={'about-symbols'} className={'symbols-img'} />
        <h2 className={'about-title'}>The Future Of Filmmaking</h2>
        <img src={xDots} alt={'about-x-dots'} className={'about-x-dots'} />
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
      <img src={downDots} alt={'down-up-dots'} className={'down-dots'} />
    </div>
  );
};
