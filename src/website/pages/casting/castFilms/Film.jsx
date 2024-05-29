import './style.scss';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import CastFilmCards from '../../../components/castFilmCard/CastFilmCard';

export const CastFilms = () => {
  const firstThreeFilmCards = FILM_CARDS.slice(0, 3);

  return (
    <div className={'cast-box-wrapper'}>
      {firstThreeFilmCards.map((card, index) => (
        <CastFilmCards
          name={card.title}
          character={card.roles}
          key={index}
          img={card.img}
          backgroundStatic={card.backgroundStatic}
          backgroundHover={card.backgroundHover}
          buttonText={card.buttonText}
          path={card.path}
          roles={card.roles}
          movieDes={card.movieDes}
        />
      ))}
    </div>
  );
};
