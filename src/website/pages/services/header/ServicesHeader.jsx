import Header from '../../../components/header/Header';
import './style.scss';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import crown from '../../../assets/images/crown.svg';
import freeform from '../../../assets/images/freeformLogo.svg';
import disney from '../../../assets/images/disney.svg';
import hulu from '../../../assets/images/hulu-logo.svg';
import amazon from '../../../assets/images/amazon-logo.svg';
import hbo from '../../../assets/images/hbo.svg';
import downDots from '../../../assets/images/image 18.svg';
import upperDots from '../../../assets/images/image 16.svg';
import { useState } from 'react';

const logos = [freeform, disney, hulu, amazon, hbo];
export const ServicesHeader = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const renderedLogoBox = () => {
    return (
      <div className={'rendered-logoBox'}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`logo-${index}`} className={'logo'} />
        ))}
      </div>
    );
  };

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'services-wrapper'}>
      <img src={upperDots} alt={'up-dots'} className={'up-dots-services'} />
      <Header />
      <div className={'inner-content'}>
        <img src={crown} alt={'services-crown'} className={'services-crown'} />
        <h2 className={'services-header-title'}>
          top quality <br /> video production
        </h2>
        {renderedLogoBox()}
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
      <img src={downDots} alt={'up-dots'} className={'down-dots-services'} />
    </div>
  );
};
