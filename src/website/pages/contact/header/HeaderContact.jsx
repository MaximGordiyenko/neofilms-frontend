import './style.scss';
import imageForm from '../../../assets/images/content-files-quill-ink-30.svg';
import Form from '../../../components/form/TestForm';
import Header from '../../../components/header/Header';
import React, { useState } from 'react';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import ContactForm from "../../../components/form/ContactUsForm";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import background from "../../../assets/images/contact-bg.png";

export const HeaderContact = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'header-contact-wrapper'}>
      <Header />
      <LazyLoadImage src={background} wrapperClassName='contacts-header-box' effect='blur'/>
      <div className={'header-contact'}>
        <div className={'form-wrapper'}>
          <div className={'contact-description'}>
            <div className={'form-title-contact'}>
              <h2 className={'form-des-title'}>Contact Us for Any Questions</h2>
              <img src={imageForm} alt={'imageForm'} className={'imageForm'} />
            </div>
            <p className={'form-des-text'}>
              Have questions or need more information? Fill out the form below and our team at Neofilms will get back to you shortly.
              We're here to help with any inquiries you have about our movie recording services.
            </p>
          </div>
          <ContactForm />
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
        <Navbar />
      )}
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
    </div>
  );
};
