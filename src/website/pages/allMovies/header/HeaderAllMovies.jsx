import film from "../../../assets/images/interface-essential-paginate-filter-camera-10.svg";
import React from "react";
import './style.css';
import Header from "../../../components/header/Header";
import menuMobile from "../../../assets/images/burger-menu.svg";
import {Navbar} from "../../../components/navbar/Navbar";
import {useMediaQuery} from "@mui/material";

export const HeaderAllMovies = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };
  return (
    <div className='upper-movies-section'>
      <Header/>
      <div className='all-movies-title'>
        <h2>Original Films, Series & More</h2>
        <img src={film} alt='all-movies film'/>
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
    </div>
  )
}