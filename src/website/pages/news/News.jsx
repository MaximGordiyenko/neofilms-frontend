import './style.scss';
import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import ball from '../../assets/images/ecology-global-warming-globe-fire-31.svg';
import menuMobile from '../../assets/images/burger-menu.svg';
import lowerBg from '../../assets/images/BG_News.jpg';
import { Navbar } from '../../components/navbar/Navbar';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { useState } from 'react';
import { NewsPageCards } from './newsCards/NewsPageCards';
import { Button } from '../../components/button/Button';
import { FilledButton } from '../../components/button/FilledButton';
import lowerStroke from '../../assets/images/footer-hp-placeholder.svg';

export const News = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'news-wrapper'}>
      <div className={'news-header'}>
        <Header />
        <div className={'title-news-box'}>
          <h2 className={'news-title-text'}>
            neo films <br /> latest news
          </h2>
          <img src={ball} alt={'news-title-ball'} className={'news-ball'} />
        </div>
      </div>
      <div className={'news-page-cards-box'}>
        <NewsPageCards />
      </div>
      <div className={'pagination-btn'}>
        <FilledButton btnText={'show older'} />
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
      <img src={lowerBg} alt={'lower-bg-news'} className={'lower-bg-news'} />
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      <img src={lowerStroke} alt={'lower-news-stroke'} className={'lower-news-stroke'} />
      <FooterCreds />
    </div>
  );
};
