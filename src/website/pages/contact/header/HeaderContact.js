import './style.scss';
import imageForm from '../../../assets/images/content-files-quill-ink-30.svg';
import Form from '../../../components/form/TestForm';
import Header from '../../../components/header/Header';
import { useState } from 'react';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
export const HeaderContact = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'header-contact-wrapper'}>
      <Header />
      <div className={'header-contact'}>
        <div className={'form-wrapper'}>
          <div className={'contact-description'}>
            <span className={'upper-span'}>Cras orci et eu nec</span>
            <div className={'form-title-contact'}>
              <h2 className={'form-des-title'}>Contact Us for Any Questions</h2>
              <img src={imageForm} alt={'imageForm'} className={'imageForm'} />
            </div>
            <p className={'form-des-text'}>
              Id vivamus habitant ac lectus diam et. Dignissim at mauris sagittis nibh maecenas
              adipiscing. Facilisis enim nunc aliquet quis ipsum. Vitae id sodales nunc congue morbi
              consectetur sed.
            </p>
          </div>
          <Form />
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
