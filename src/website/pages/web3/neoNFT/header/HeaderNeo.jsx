import './style.scss';
import Header from '../../../../components/header/Header';
import menuMobile from '../../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../../components/navbar/Navbar';
import { MobMenu } from '../../../../components/mobileMenu/MobMenu';
import { useState } from 'react';

export const HeaderNeo = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'neo-nft-header'}>
      <Header />
      <div className={'neo-nft-title'}>
        <h2>NEO NFTs COLLECTION</h2>
        <p>
          Behind the scenes access, raffles of memorabillia, all-expense paid trips to our film
          sets, a chance to be an extra in our films, access to red carpet premieres, table reads,
          and so much more! Our NEO NFTs give holders access to the film industry in ways that were
          never possible before.
        </p>
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
