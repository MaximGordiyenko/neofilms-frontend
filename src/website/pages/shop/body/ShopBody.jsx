import {ShopifyProduct} from "../../../components/product/product";
import React, {useEffect, useRef, useState} from "react";
import Header from "../../../components/header/Header";
import menuMobile from "../../../assets/images/burger-menu.svg";
import {Navbar} from "../../../components/navbar/Navbar";
import {MobMenu} from "../../../components/mobileMenu/MobMenu";
import './style.css'
import {useLocation} from "react-router-dom";
import {Button} from "../../../components/button/Button";

export const ShopBody = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

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

  return (
    <div className="shopify-products_wrapper">
      <div className="shop-header">
        <Header/>
        <div className={'soon-page-inner-box'}>
          <div className={'soon-title'}>
            <h2 className="soon-title-text">
              neo store
            </h2>
          </div>
          <Button
            isGlitch
            text="Go to shop"
            isFilled
            additionalClass="filled-button-box"
            onClick={() => window.open('https://theneoshop.store/', '_blank')}
          />
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
        {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen}/>}
      </div>
      <ShopifyProduct/>
    </div>
  )
}