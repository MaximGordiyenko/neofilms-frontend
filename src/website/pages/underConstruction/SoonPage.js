import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import satelite from '../../assets/images/constructor-img.svg';
import './style.scss';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { useState } from 'react';
import menuMobile from '../../assets/images/burger-menu.svg';
import { Navbar } from '../../components/navbar/Navbar';
export const UnderConstruction = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'soon-page-wrapper'}>
      <Header />
      <div className={'soon-page-inner-box'}>
        <div className={'soon-title'}>
          <h2>
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
          <Navbar />
        )}
        {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      </div>
      <FooterCreds />
    </div>
  );
};
