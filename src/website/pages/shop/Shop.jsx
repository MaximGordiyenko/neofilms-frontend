import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import satelite from '../../assets/images/constructor-img.svg';
import './style.scss';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import menuMobile from '../../assets/images/burger-menu.svg';
import { Navbar } from '../../components/navbar/Navbar';
import { Text } from "../../components/text/Text";
import {ShopifyProduct} from "../product/product";

const Shop = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isMobile = window.innerWidth <= 430;
  const navbarRef = useRef(null);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      if (!isLoading && hasScrolled) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  }, [isLoading, hasScrolled]);

  return (
    <div className={'soon-page-wrapper'}>
      <Header />
      <div className={'soon-page-inner-box'}>
        <div className={'soon-title'}>
          <h2 className="soon-title-text">
            neo store
          </h2>
          <img src={satelite} alt={'under-construction'} className={'under-construction'} />
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
        <Navbar ref={navbarRef} />
      )}
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
      <div className="shopify-products_wrapper">
        <ShopifyProduct />
      </div>
      <FooterCreds />
    </div>
  );
};

export default Shop;
