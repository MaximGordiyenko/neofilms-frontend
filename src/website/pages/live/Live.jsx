import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import './style.scss';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import { Navbar } from '../../components/navbar/Navbar';
import * as liveApi from '../../../api/live';
import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';
import upperDots from '../../assets/images/image 16.svg';
import downDots from '../../assets/images/image 18.svg';
import mobMenu from '../../assets/images/sidebar-menu-mob.svg';

export const Live = () => {
  const location = useLocation();
  const [initialActive, setInitialActive] = useState(location.pathname);
  const isMobile = window.innerWidth <= 430;
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [liveUrl, setLiveUrl] = useState(null);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setInitialActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    liveApi.status().then((res) => {
      console.log("live status", res.data.is_active, res.data.access_for_nft);
      setIsActive(res.data.is_active);
      liveApi.check().then((res) => {
        console.log("check", res.data.live_url);
        setLiveUrl(res.data.live_url);
      });
    }).catch((err) => {
      console.error("Error fetching live status", err);
    });
  }, []);

  return (
    <div className={'live-wrapper'}>
      <div className="inner-content-live">
        <div className={'live-inner-content'}>
          <img src={upperDots} alt={'up-dots'} className={'live-up-dots'}/>
          <Header/>
          {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen}/>}
          <img src={downDots} alt={'up-dots'} className={'live-down-dots'}/>
        </div>
        {
          isActive ? (
            liveUrl ? (
              <div className="live-stream-box">
                <iframe
                  width="1501"
                  height="776"
                  src={liveUrl}
                  title="NEO Live Stream"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>
                </iframe>
              </div>
            ) : (
              <div className="live-stream-box">
                <h2 className="live-stream-title">Live stream is currently offline</h2>
              </div>
            )
          ) : (
            <div className="live-stream-box">
              <h2 className="live-stream-title">Live stream is currently offline</h2>
            </div>
          )
        }
        <div className="live-title-box">
          <h2 className="live-title">Livestream Media Hub</h2>
          <div className="live-soon">
            <h4 className="soon-span">coming soon</h4>
          </div>
        </div>
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
