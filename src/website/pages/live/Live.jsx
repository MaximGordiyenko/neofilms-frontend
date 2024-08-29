import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import './style.scss';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { Navbar } from '../../components/navbar/Navbar';
import * as liveApi from '../../../api/live';
import mobMenu from '../../assets/images/sidebar-menu-mob.svg';
import wallet from "../../assets/images/wallet connect.svg";
import refresh from "../../assets/images/Linear/Arrows/Refresh.svg";
import {getAccount, signData} from "../../../utils/MetaMask";
import * as authApi from "../../../api/auth";
import elipse from '../../assets/images/Ellipse 102.svg'
import rec from '../../assets/images/Ellipse 97.svg'
import keys from '../../assets/images/keys.svg';
import accessImg from '../../assets/images/business-products-cash-user-man-message-49.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import background from '../../assets/images/image 66.jpg'
import * as neobuxApi from "../../../api/neobux";

const Live = () => {
  const isMobile = window.innerWidth <= 430;
  const location = useLocation();
  const [initialActive, setInitialActive] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  
  const [isActive, setIsActive] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isGotAccess, setIsGotAccess] = useState(null);
  const [livesInfo, setLivesInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0.0");

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  const login = async () => {
    const account = await getAccount();
    const data = (await authApi.getData(account)).data.data;
    const sign = await signData(data);
    await authApi.login(account, sign);
    console.log(account, 'acc', data, 'data');
  }

  const getBalance = async () => {
    setIsLoading(true)
    const account = await getAccount();
    const balance = (await neobuxApi.balanceOf(account)).data.balance;
    setBalance(balance);
    setIsLoading(false)
  }
  useEffect(() => {
    setInitialActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    liveApi.status().then((res) => {
      console.log("live status", res.data.is_active, res.data.access_for_nft);
      setIsActive(res.data.is_active);
      authApi.check().then((res) => {
        setIsAuthorized(true)
        console.log("auth check", res.data);
        setIsAuthorized(res.data);
        liveApi.check().then((res) => {
          console.log("live check", res.data);
          setIsGotAccess(res.data);
          liveApi.info().then((res) => {
            console.log("live info:", res.data);
            setLivesInfo(res.data);
          }).catch((err) => {
            console.error("Error fetching live info", err);
          });
        }).catch((err) => {
          console.error("Error fetching live status", err);
        });
      }).catch((err) => {
        console.error("Error fetching auth status", err);
      });
    }).catch((err) => {
      console.error("Error fetching live status", err);
    });
  }, []);

  const renderContent = () => {
    if (!isAuthorized) {
      return (
        <div className="live-stream-box">
          <div className="have_not-access">
            <img alt="" src={keys}/>
            <h3>NeoFilms Live is Available
              Only for Our NFTs Holders</h3>
            <p>Please authorize with WalletConnect to gain access</p>
          </div>
        </div>
      );
    }

    if (!isGotAccess) {
      return (
        <div className="live-stream-box">
          <div className="have-access">
            <img alt="" src={accessImg}/>
            <h3>Looks Like You Have
              No NeoFilms NFTs Acquired</h3>
            <p>Purchase Any NeoFilms NFT to Gain Access to NeoFilms Live</p>
          </div>
        </div>
      );
    }

    if (!livesInfo) {
      return null;
    }
    return (
      <>
        {livesInfo.map((live) => (
          <iframe
            width="100%"
            height="100%"
            src={live.url}
            title="NEO Live Stream"
            frameBorder="0"
            className="video-frame"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
            <div className="live-mark">Live<img alt="" src={rec}/></div>
          </iframe>
        ))}
      </>
    );
  };

  return (
    <div className='live-wrapper' >
      <LazyLoadImage
        src={background}
        alt='Background'
        effect='blur'
      />
      <div className="inner-content-live">
        <div className='live-inner-content'>
          <Header/>
          {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen}/>}
        </div>
        {
          isMobile ?
            <div className="mob-title-box">
              <div className='balance-text-mob'>
                <span>Your Balance:</span>
                <div className={'balance-count'}>{balance} NEOBux</div>
                <button className={'reload-btn'} onClick={getBalance}>
                  <img
                    src={refresh}
                    alt={'refresh-balance'}
                    className={`refresh-balance ${isLoading ? 'spinning' : ''}`}
                  />
                </button>
              </div>
              <div className="live-title">
                <h2>Neofilms</h2>
                <h2>live <img className="elipse" alt="" src={elipse}/></h2>
              </div>
              <button
                className={'button-balance'}
                onClick={login}
              >
                <span>{isAuthorized ? 'Wallet connected' : 'Connect your wallet'}</span>
              </button>
            </div>
            :
            <div className="live-title-box">
              <div className="live-title">
                <h2>Neofilms</h2>
                <h2>live <img className="elipse" alt="" src={elipse}/></h2>
              </div>
              <div className={'title-box'}>
                <div className={'balance-box'}>
                  <button
                    className={'button-balance'}
                    onClick={login}
                  >
                    <span>{isAuthorized ? 'Wallet connected' : 'Connect your wallet'}</span>
                  </button>
                  <div className={'balance-text'}>
                    <span>Your Balance:</span>
                    <div className={'balance-count'}>{balance} NEOBux</div>
                    <button className={'reload-btn'} onClick={getBalance}>
                      <img
                        src={refresh}
                        alt={'refresh-balance'}
                        className={`refresh-balance ${isLoading ? 'spinning' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        }
        {renderContent()}
        {/*{*/}
        {/*  isActive && (*/}
        {/*    liveUrl ? (*/}
        {/*      <iframe*/}
        {/*        width="100%"*/}
        {/*        height="100%"*/}
        {/*        src={`${liveUrl}`}*/}
        {/*        title="NEO Live Stream"*/}
        {/*        frameBorder="0"*/}
        {/*        className="video-frame"*/}
        {/*        referrerPolicy="strict-origin-when-cross-origin"*/}
        {/*        allowFullScreen>*/}
        {/*        <div className="live-mark">Live<img alt="" src={rec}/></div>*/}
        {/*      </iframe>*/}
        {/*    ) : (*/}
        {/*      <div className="live-stream-box">*/}
        {/*        {*/}
        {/*          isGotAccess ?*/}
        {/*            <div className="have-access">*/}
        {/*              <img alt="" src={accessImg}/>*/}
        {/*              <h3>Looks Like You Have*/}
        {/*                No NeoFilms NFTs Acquired</h3>*/}
        {/*              <p>Purchase Any NeoFilms NFT to Gain Access to NeoFilms Live</p>*/}
        {/*            </div> :*/}
        {/*            <div className="have_not-access">*/}
        {/*              <img alt="" src={keys}/>*/}
        {/*              <h3>NeoFilms Live is Available*/}
        {/*                Only for Our NFTs Holders</h3>*/}
        {/*              <p>Please autorize with WalletConnect to gain access</p>*/}
        {/*            </div>*/}
        {/*        }*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  )*/}
        {/*}*/}
      </div>
      {isMobile ? (
        <img
          src={mobMenu}
          alt={'mob-menu-live'}
          className={'mob-menu-live'}
          onClick={handleOpenMobMenu}
        />
      ) : (
        <Navbar/>
      )}
      <FooterCreds/>
    </div>
  );
};

export default Live;