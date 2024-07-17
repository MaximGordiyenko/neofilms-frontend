import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import satelite from '../../assets/images/constructor-img.svg';
import './style.scss';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import menuMobile from '../../assets/images/burger-menu.svg';
import { Navbar } from '../../components/navbar/Navbar';
import { Text } from "../../components/text/Text";

export const UnderConstruction = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = window.innerWidth <= 430;
  const navbarRef = useRef(null);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      if (isLoading) {
        navbar.style.bottom = '-10vh'; // Example style
      } else {
        navbar.style.bottom = '-10vh'; // Reset style
      }
    }
  }, [isLoading]);

  return (
    <div className={'soon-page-wrapper'}>
      <Header />
      <div className={'soon-page-inner-box'}>
        <div className={'soon-title'}>
          <h2 className="soon-title-text">
            This page <br /> is under construction
          </h2>
          <img src={satelite} alt={'under-construction'} className={'under-construction'} />
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
          <Navbar ref={navbarRef} />
        )}
        {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      </div>
      <FooterCreds />
    </div>
  );
};
