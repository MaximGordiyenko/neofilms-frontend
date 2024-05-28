import Header from '../../components/header/Header';
import './style.scss';
import film from '../../assets/images/interface-essential-paginate-filter-camera-10.svg';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import { FILM_CARDS } from '../../constants/filmsConstants';
import bg from '../../assets/images/image 37.jpg';
import { FilledButton } from '../../components/button/FilledButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AllMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  const handleShowOlderClick = () => {
    setCardsPerPage(cardsPerPage * 2);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={'all-movies-wrapper'}>
      <div className={'upper-movies-section'}>
        <Header />
        <div className={'all-movies-title'}>
          <h2>Original Films, Series & More</h2>
          <img src={film} alt={'all-movies film'} />
        </div>
      </div>
      <div className={'films-cards-am'}>
        {FILM_CARDS.map((card, index) => (
          <Link to={`/film-details${card.path}`} key={index} className={'link-to-details-am'}>
            <div className={'img-am-box'} style={{ backgroundColor: card.backgroundStatic }}>
              <div className={'poster-am-title'}>
                <span className={'all-m-title-card'}>{card.title}</span>
                <span className={'date-all-movies'}>{card.date}</span>
              </div>
              <img src={card.img} className={'am-poster-img'} alt={'am-post-am'} />
            </div>
          </Link>
        ))}
      </div>
      <div className={'lower-bg-am-box'}>
        <img className={'bg-wrapper-am'} src={bg} alt={'bg-wrapper-am'} />
      </div>
      <FilledButton btnText={'show older'} onClick={handleShowOlderClick} />
      <FooterCreds />
    </div>
  );
};
