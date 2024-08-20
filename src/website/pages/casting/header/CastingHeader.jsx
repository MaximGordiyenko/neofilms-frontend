import React, { useState } from 'react';
import './style.scss';
import Header from '../../../components/header/Header';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import bg from '../../../assets/images/image 68.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {LazyLoadImage} from "react-lazy-load-image-component";

export const CastingHeader = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  return (
    <div className={'cast-header-wrapper'}>
      <div className="casting-header">
        <Header />
        <LazyLoadImage src={bg} effect='blur' wrapperClassName='casting-lazy'/>
        <h2 className="title-casting">Casting</h2>
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
    </div>
  );
};
