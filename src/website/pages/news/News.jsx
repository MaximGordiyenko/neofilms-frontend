import './style.scss';
import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import ball from '../../assets/images/ecology-global-warming-globe-fire-31.svg';
import menuMobile from '../../assets/images/burger-menu.svg';
import lowerBg from '../../assets/images/image 71.jpg';
import { Navbar } from '../../components/navbar/Navbar';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { useEffect, useRef, useState } from 'react';
import { NewsPageCards } from './newsCards/NewsPageCards';
import { FilledButton } from '../../components/button/FilledButton';
import lowerStroke from '../../assets/images/footer-hp-placeholder.svg';
import { Flex } from "../../components/customDiv/Flex";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import bg from '../../assets/images/image 70.jpg';
import background from "../../assets/images/about-bg.jpg";
const News = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={'news-wrapper'}>
      <Flex flexDirection="column" className={'news-header'}>
        <Header />
        <LazyLoadImage src={bg} wrapperClassName='news-header-box' effect='blur'/>
        <div className={'title-news-box'}>
          <h2 className={'news-title-text'}>
            neo films <br /> latest news
          </h2>
          <img src={ball} alt={'news-title-ball'} className={'news-ball'} />
        </div>
      </Flex>
      <div className={'news-page-cards-box'}>
        <NewsPageCards />
      </div>
      <div className={'pagination-btn'}>
        <FilledButton btnText={'older'} />
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
        <Navbar/>
      )}
      <img src={lowerBg} alt={'lower-bg-news'} className={'lower-bg-news'} />
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      <img src={lowerStroke} alt={'lower-news-stroke'} className={'lower-news-stroke'} />
      <FooterCreds />
    </div>
  );
};

export default News;
