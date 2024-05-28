import './style.scss';
import fAward from '../../../assets/images/fAward.svg';
import sAward from '../../../assets/images/sAward.svg';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import FilmCards from './FilmsCards';
import { Button } from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
export const Films = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/all_movies', { replace: true });
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const firstThreeFilmCards = FILM_CARDS.slice(0, 3);

  return (
    <div className={'films-box-wrapper'}>
      <h3 className={'films-title'}>original films, series & more</h3>
      <p className={'films-subtitle'}>
        Our team has experience working on projects currently on Freeform, Hulu, and Amazon Prime.
        Most recently awarded multiple accolades from San Francisco Indie film festival, Los Angeles
        International Film Festival, and many more.
      </p>
      <div className={'rewards'}>
        <img src={fAward} alt={'fAward-films'} />
        <img src={sAward} alt={'sAward-films'} />
      </div>
      <div className={'film-cards-box'}>
        {firstThreeFilmCards.map((card, index) => (
          <FilmCards
            roles={card.roles}
            key={index}
            img={card.img}
            title={card.title}
            date={card.date}
            backgroundStatic={card.backgroundStatic}
            backgroundHover={card.backgroundHover}
            buttonText={card.buttonText}
            path={card.path}
          />
        ))}
      </div>
      <Button onClick={handleNav} text={'explore full library'} style={{ width: '100%' }} />
    </div>
  );
};
