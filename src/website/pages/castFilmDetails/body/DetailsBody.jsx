import React from 'react';
import './style.css';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import { ArtistFilmCard } from '../../../components/artistCard/ArtistFilmCard';
import bodyBg from '../../../assets/images/BG-Details.jpg';
import { DetailFilmDefinition } from '../descFilm/DetailFilmDefinition';

export const DetailsBody = ({ onApplyClick }) => {
  const firstThreeFilmCards = FILM_CARDS.slice(0, 4);
  const movieDescription = firstThreeFilmCards[0].movieDes;

  return (
    <div className="detail-body">
      <div className="body-film-def">
        <DetailFilmDefinition />
      </div>
      <p className={'detail-desc'}>{movieDescription}</p>
      <img className="body-bg" src={bodyBg} alt="" />
      <div className="cards-wrapper">
        <div className="detail-cards">
          {firstThreeFilmCards.map((card, index) => (
            <ArtistFilmCard
              actor_name={card.actor.actor_name}
              key={index}
              bio={card.actor.bio}
              onApplyClick={onApplyClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
