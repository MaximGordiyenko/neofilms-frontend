import Header from '../../../../components/header/Header';
import wallet from '../../../../assets/images/wallet connect.svg';
import refresh from '../../../../assets/images/Linear/Arrows/Refresh.svg';
import './style.scss';
import { Navbar } from '../../../../components/navbar/Navbar';
import menuMobile from '../../../../assets/images/burger-menu.svg';
import { MobMenu } from '../../../../components/mobileMenu/MobMenu';
import { useState } from 'react';
import { getAccount, signData } from '../../../../../utils/MetaMask';
import * as authApi from '../../../../../api/auth';
import * as neobuxApi from '../../../../../api/neobux';

export const HeaderStaking = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;
  const [balance, setBalance] = useState("0.0");

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  const login = async () => {
      const account = await getAccount();
      const data = (await authApi.getData(account)).data.data;
      const sign = await signData(data);
      await authApi.login(account, sign);
      await getBalance();
  }

  const getBalance = async () => {
    const account = await getAccount();
    const balance = (await neobuxApi.balanceOf(account)).data.balance;
    setBalance(balance);
  }

  return (
    <div className={'staking-header-wrapper'}>
      <Header />
      {isMobile ? (
        <div className={'mobile-title-box'}>
          <div className={'balance-mob-text'}>
            <span>Your Balance:</span>
            <div className={'balance-count'}>{balance} NEOBux</div>
            <button
              className={'reload-btn'}
              onClick={getBalance}
            >
              <img src={refresh} alt={'refresh-balance'} className={'refresh-balance'} />
            </button>
          </div>
          <h2 className={'staking-title'}>
            neo <br />
            staking
          </h2>
          <div className={'balance-mob-box'}>
            <button
              className={'button-balance'}
              onClick={login}
            >
              <img src={wallet} alt={'btn-wallet'} className={'wallet-btn'} />
              <span>WalletConnect</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={'title-box'}>
          <h2 className={'staking-title'}>neo staking</h2>
          <div className={'balance-box'}>
            <button
              className={'button-balance'}
              onClick={login}
            >
              <img src={wallet} alt={'btn-wallet'} className={'wallet-btn'} />
              <span>WalletConnect</span>
            </button>
            <div className={'balance-text'}>
              <span>Your Balance:</span>
              <div className={'balance-count'}>{balance} NEOBux</div>
              <button
                className={'reload-btn'}
                onClick={getBalance}
              >
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
