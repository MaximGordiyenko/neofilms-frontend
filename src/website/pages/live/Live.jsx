import Header from '../../components/header/Header';
import './style.scss';
import clipleft from '../../assets/images/clipleft.svg';
import { NAVBAR_TABS } from '../../constants/homePageConst';
import { Link, useLocation } from 'react-router-dom';
import clipright from '../../assets/images/clipright.svg';
import { useEffect, useState } from 'react';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import upperDots from '../../assets/images/image 16.svg';
import downDots from '../../assets/images/image 18.svg';
import mobMenu from '../../assets/images/sidebar-menu-mob.svg';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { Navbar } from '../../components/navbar/Navbar';

export const Live = () => {
  const location = useLocation();
  const [initialActive, setInitialActive] = useState(location.pathname);
  const isMobile = window.innerWidth <= 430;
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setInitialActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className={'live-wrapper'}>
      <div className="inner-content-live">
        <div className={'live-inner-content'}>
          <img src={upperDots} alt={'up-dots'} className={'live-up-dots'}/>
          <Header/>
          {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen}/>}
          <img src={downDots} alt={'up-dots'} className={'live-down-dots'}/>
        </div>
        <div className={'live-title-box'}>
          <h2 className={'live-title'}>Livestream Media Hub</h2>
          <div className={'live-soon'}>
            <h4 className={'soon-span'}>coming soon</h4>
          </div>
        </div>
      </div>
      {isMobile ? (
        <img
          src={mobMenu}
          alt={'mob-menu-live'}
          className={'mob-menu-live'}
          onClick={handleOpenMobMenu}
        />
      ) : (
        <Navbar/>
      )}
      <FooterCreds/>
    </div>
  );
};
