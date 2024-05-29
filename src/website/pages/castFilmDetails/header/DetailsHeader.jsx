import './style.css';
import { useParams } from 'react-router-dom';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import Header from '../../../components/header/Header';
import Icon from '../../../assets/images/IMDb.png';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import React, { useState } from 'react';
export const CastDetHeader = () => {
  const { path } = useParams(); // Get the dynamic parameter
  const film = FILM_CARDS.find((film) => film.path === `/${path}`);
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className="detail-header">
      <Header />
      <div
        className="background-header"
        style={{
          backgroundImage: `url(${film.backgroundImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div className="detail-header-content">
        <p className="detail-text">{film.date}</p>
        <h2 className="detail-title">{film.title}</h2>
        <div className="text">
          <b className="detail-title-text">
            {film.filmAbout} <img className="header-icon" src={Icon} alt="IMDb Icon" />
          </b>
        </div>
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
        <div className="navbar-wrapper">
          <Navbar />
        </div>
      )}
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
    </div>
  );
};
