import Header from '../../../../components/header/Header';
import { useEffect, useState } from 'react';
import wallet from '../../../../assets/images/wallet connect.svg';
import refresh from '../../../../assets/images/Linear/Arrows/Refresh.svg';
import './style.scss';
import { Navbar } from '../../../../components/navbar/Navbar';
import menuMobile from '../../../../assets/images/burger-menu.svg';
import { MobMenu } from '../../../../components/mobileMenu/MobMenu';
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import background from "../../../../assets/images/Staking_BG.jpg";

import { getAccount, signData } from '../../../../../utils/MetaMask';
import * as authApi from '../../../../../api/auth';
import * as neobuxApi from '../../../../../api/neobux';
import {Wallet} from "../../../../components/wallet/Wallet";
import * as authCheck from "../../../../../api/auth";
import Spinner from "../../../../components/loader/Spinner";

export const HeaderRedeem = ({ onLogin }) => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [balance, setBalance] = useState("0.0");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const isMobile = window.innerWidth <= 430;

  useEffect(() => {
    getBalance();
  }, []);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  const checkAuth = async () => {
    try {
      const response = await authApi.check();
      setIsAuthenticated(response.status === 200);
      return response.status === 200;
    } catch (error) {
      setIsAuthenticated(false);
      if (error.response && error.response.status === 401) {
        return false;
      } else {
        console.error("An error occurred while checking authentication:", error);
      }
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const account = await getAccount();
      const response = await authApi.getData(account);
      const data = response.data.data;
      const sign = await signData(data);
      await authApi.login(account, sign);
      setIsAuthenticated(true);
      getBalance();
      onLogin();
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    try {
      setIsReloading(true);
      const account = await getAccount();
      if (account) {
        const response = await neobuxApi.balanceOf(account);
        setBalance(response.data.balance);
      }
      setIsAuthenticated(true);
      setIsReloading(false);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setIsReloading(false);
    }
  };

  return (
    <div className={'redeem-header-wrapper'}>
      <Header />
      {isMobile ? (
        <div className={'mobile-title-box'}>
          <div className={'balance-mob-text'}>
            <span>Your Balance:</span>
            <div className={'balance-count'}>{balance} NEOBux</div>
            <button
              className={'reload-btn'}
              onClick={getBalance}
              disabled={isReloading}
            >
              <img
                src={refresh}
                alt={'refresh-balance'}
                className={`refresh-balance ${isReloading ? 'spinning' : ''}`}
              />
            </button>
          </div>
          <h2 className={'staking-title'}>
            redeem <br />
            rewards
          </h2>
          <div className={'balance-mob-box'}>
            <button
              className={'button-balance'}
              onClick={login}
              disabled={isLoading}
            >
              <span>{isAuthenticated ? "Wallet connected" : "Connect your wallet"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={'title-box'}>
          <h2 className={'redeem-title'}>redeem rewards</h2>
          <div className={'balance-box'}>
            <button
              className={'button-balance'}
              onClick={login}
              disabled={isLoading}
            >
              <span>{isAuthenticated ? "Wallet connected" : "Connect your wallet"}</span>
            </button>
            <div className={'balance-text'}>
              <span>Your Balance:</span>
              <div className={'balance-count'}>{balance} NEOBux</div>
              <button
                className={'reload-btn'}
                onClick={getBalance}
                disabled={isReloading}
              >
                <img
                  src={refresh}
                  alt={'refresh-balance'}
                  className={`refresh-balance ${isReloading ? 'spinning' : ''}`}
                />
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
