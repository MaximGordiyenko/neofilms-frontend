import './style.css';
import { useParams } from 'react-router-dom';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import Header from '../../../components/header/Header';
import Icon from '../../../assets/images/IMDb.png';
import menuMobile from '../../../assets/images/burger-menu.svg';
import { Navbar } from '../../../components/navbar/Navbar';
import { MobMenu } from '../../../components/mobileMenu/MobMenu';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getCasting, getImage } from "../../../../api/casting";

export const CastDetHeader = () => {
  const isMobile = window.innerWidth <= 430;
  const { casting_id } = useParams();
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [casting, setCasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [castingImage, setImage] = useState(null);

  const handleOpenMobMenu = () => {
    setIsMobMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!casting_id) {
      setError('Film not found');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCastingDetail = async () => {
      try {
        const [detailsResponse, imageResponse] = await axios.all([
          getCasting(casting_id),
          getImage(casting_id)
        ]);

        if (isMounted) {
          setCasting(detailsResponse.data);
          const imageBlob = imageResponse.data;
          const imageUrl = URL.createObjectURL(imageBlob);
          setImage(imageUrl);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to fetch film details or poster');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCastingDetail();
    return () => {
      isMounted = false;
    };
  }, [casting_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!casting) {
    return <p>No details available.</p>;
  }

  return (
    <div className="detail-header">
      <Header />
      <div
        className="background-header"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${castingImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div className="detail-header-content">
        <p className="detail-text">{casting.date}</p>
        <h2 className="detail-title">{casting.title}</h2>
      </div>
      {isMobile ? (
        <div className="menu-mob-wrapper">
          <img
            src={menuMobile}
            className="sidebar-mob-btn"
            onClick={handleOpenMobMenu}
            alt="menuMob-hp"
          />
        </div>
      ) : (
        <div className="navbar-wrapper">
          <Navbar />
        </div>
      )}
      {isMobileMenuOpen && <MobMenu onClose={handleOpenMobMenu} isOpen={isMobileMenuOpen} />}
    </div>
  );
};