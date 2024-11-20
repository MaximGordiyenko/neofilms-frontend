import upperDots from '../../../assets/images/image 16.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import downDots from '../../../assets/images/image 18.svg';
import './style.scss';
import Header from '../../../components/header/Header';
import videoBg from '../../../assets/images/HeroVid10 (1).mp4';
import { Button } from '../../../components/button/Button';
import menuMobile from '../../../assets/images/burger-menu.svg';
import {useEffect, useRef, useState} from 'react';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import './glitch.css';
import {GlitchButton} from "../../../components/button/glitchButton/GlitchButton";
import {CustomModal} from "../../../components/modal/Modal";
import videoBG from "../../../assets/neo-video.mp4"
import closeBtn from "../../../assets/images/xmarkmodal.png";

export const HomepageHeader = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;
  const videoRef = useRef(null);


  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Video playback failed:', error);
      });
    }
  }, [isModalOpen]);

  return (
    <div className={'homepage-header-box'}>
      <img src={upperDots} alt={'up-dots'} className={'up-dots'} />
      <Header />
      <video
        autoPlay
        playsInline={true}
        muted
        loop
        preload={!isMobile && 'auto'}
        className={'video'}>
        <source src={videoBg} />
      </video>
      {isMobile ? (
        <div className={'poster-container'}>
          <div className={'home-title'}>
            <h1>The</h1>
            <h1>Future Of</h1>
            <h1>Filmmaking</h1>
          </div>
          <Button isGlitch text={'watch reel'} width={'250px'} onClick={handleOpenModal}/>
        </div>
      ) : (
        <div className={'poster-container'}>
          <div className={'home-title'}>
            <h1>The Future</h1>
            <h1>Of Filmmaking</h1>
          </div>
          <Button text={'watch reel'} width={'250px'} isGlitch onClick={handleOpenModal}/>
        </div>
      )}
      <div className={'navbar-box'}>
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
      <img src={downDots} alt={'up-dots'} className={'down-dots'} />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Watch Reel"
        content={
          <div className="video-container">
            <button onClick={handleCloseModal} className="close-button">
              <img src={closeBtn} alt=""/>
            </button>
            <video controls className="modal-video" ref={videoRef}>
              <source src={videoBG} type="video/mp4"/>
            </video>
          </div>
        }
      />
    </div>
  );
};
