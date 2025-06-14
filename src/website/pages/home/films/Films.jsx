import './style.scss';
import fAward from '../../../assets/images/f-award.png';
import sAward from '../../../assets/images/reward-sec.png';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import FilmCards from './FilmsCards';
import { Button } from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { HomeFilmCards } from "./HomeFilmCards";
import Spinner from "../../../components/loader/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../../../admin_panel/store/thunk/movie.api';

export const Films = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, getMovies]);
  
  const { movies, status } = useSelector((state) => state?.movie);


  const handleNav = () => {
    navigate('/all_movies', { replace: true });
    window.scrollTo(0, 0);
  };
  const sortMoviesByDate = (movies) => {
    return movies.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  };
  return (
    <div className={'films-box-wrapper'}>
      <h3 className={'films-title'}>original films, series & more</h3>
      <p className={'films-subtitle'}>
        Our team has experience working on projects currently on Freeform, Hulu, and Amazon Prime.
        Most recently awarded multiple accolades from San Francisco Indie film festival, Los Angeles
        International Film Festival, and many more.
      </p>
      <div className={'rewards'}>
        <img src={fAward} alt={'fAward-films'} className="f-award"/>
        <img src={sAward} alt={'sAward-films'} className="s-award"/>
      </div>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div className={'film-cards-box'}>
          {movies && sortMoviesByDate(movies)?.slice(0, 3)?.map((film) => (
            <HomeFilmCards
              key={film.id}
              img={`/api/pages/movie/${film?.id}/poster`}
              title={film.title}
              date={new Date(film.release_date).toLocaleDateString()}
              description={film.description}
              movieLink={film.movie_link}
              path={film.id}
              id={film.id}
            />
          ))}
        </div>
      )}
      <Button
        isGlitch
        onClick={handleNav}
        text={'explore full library'}
        style={{width: '100%'}}
        additionalClass="explore-lib"
      />
    </div>
  );
};
