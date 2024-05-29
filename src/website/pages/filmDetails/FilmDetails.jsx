import React from 'react';
import { useParams } from 'react-router-dom';
import { FILM_CARDS } from '../../constants/filmsConstants';
import Header from '../../components/header/Header';
import './style.scss';
import { Button } from '../../components/button/Button';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import blackStroke from '../../assets/images/footer-hp-placeholder.svg';

const FilmDetails = () => {
  const { moviePath } = useParams();
  const film = FILM_CARDS.find((card) => card.path === `/${moviePath}`);

  if (!film) {
    // Handle the case where the film is not found
    return <div>Film not found</div>;
  }

  const { title, date, createdBy, starring, movieDes, backgroundImg } = film;
  return (
    <div className={'movie-details-wrapper'}>
      <div className={'bg-details-box'} style={{ backgroundImage: `url(${backgroundImg})` }}>
        <Header />
        <div className={'title-details-box'}>
          <h2>{title}</h2>
          {/*<Button text={'watch trailer'} />*/}
        </div>
      </div>
      <div className={'movie-details-desc'}>
        <div className={'announcement'}>
          <span>release date</span>
          <h2>{date}</h2>
          {/*<span>created by </span>*/}
          {/*<h2>{createdBy}</h2>*/}
        </div>
        <div className={'desc-text'}>
          {starring && (
            <>
              <span>starring</span>
              {starring.map((actor, index) => (
                <h3 key={index}>{actor}</h3>
              ))}
            </>
          )}
          <p>{movieDes}</p>
        </div>
      </div>
      <img src={blackStroke} alt={'black-stroke-details'} className={'stroke-placeholder-det'} />
      <FooterCreds />
    </div>
  );
};

export default FilmDetails;
