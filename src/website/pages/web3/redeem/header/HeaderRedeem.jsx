import Header from '../../../../components/header/Header';
import wallet from '../../../../assets/images/wallet connect.svg';
import refresh from '../../../../assets/images/Linear/Arrows/Refresh.svg';
import './style.scss';
import { Navbar } from '../../../../components/navbar/Navbar';
import React, { useState } from 'react';
import menuMobile from '../../../../assets/images/burger-menu.svg';
import { MobMenu } from '../../../../components/mobileMenu/MobMenu';
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import background from "../../../../assets/images/Staking_BG.jpg";

export const HeaderRedeem = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className={'redeem-header-wrapper'}>
      <Header />
      <LazyLoadImage src={background} wrapperClassName='redeem-header-box' effect='blur'/>
      {isMobile ? (
        <div className={'mobile-title-box'}>
          <div className={'balance-mob-text'}>
            <span>Your Balance:</span>
            <div className={'balance-count'}>0.00 NEOBux</div>
            <button className={'reload-btn'}>
              <img src={refresh} alt={'refresh-balance'} className={'refresh-balance'} />
            </button>
          </div>
          <h2 className={'staking-title'}>
            redeem <br />
            rewards
          </h2>
          <div className={'balance-mob-box'}>
            <button className={'button-balance'}>
              <img src={wallet} alt={'btn-wallet'} className={'wallet-btn'} />
              <span>WalletConnect</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={'title-box'}>
          <h2 className={'redeem-title'}>redeem rewards</h2>
          <div className={'balance-box'}>
            <button className={'button-balance'}>
              <img src={wallet} alt={'btn-wallet'} className={'wallet-btn'} />
              <span>WalletConnect</span>
            </button>
            <div className={'balance-text'}>
              <span>Your Balance:</span>
              <div className={'balance-count'}>0.00 NEOBux</div>
              <button className={'reload-btn'}>
                <img src={refresh} alt={'refresh-balance'} className={'refresh-balance'} />
              </button>
            </div>
          </div>
        </div>
      )}
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
