import './style.scss';
import fAward from '../../../assets/images/fAward.svg';
import sAward from '../../../assets/images/sAward.svg';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import FilmCards from './FilmsCards';
import { Button } from '../../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { HomeFilmCards } from "./HomeFilmCards";
import Spinner from "../../../components/loader/Spinner";

export const Films = () => {
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://57.151.104.191:8888/api/pages/movies');
        const movies = response.data;

        const moviesWithPosters = await Promise.all(movies.map(async (movie) => {
          const posterResponse = await axios.get(`http://57.151.104.191:8888/api/pages/movie/${movie.id}/poster`, { responseType: 'blob' });
          const posterUrl = URL.createObjectURL(posterResponse.data);
          return { ...movie, posterUrl };
        }));

        setFilms(moviesWithPosters);
        console.error('response', response);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  console.log(films, 'get films');

  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/all_movies', { replace: true });
    window.scrollTo(0, 0);
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
        <img src={fAward} alt={'fAward-films'} />
        <img src={sAward} alt={'sAward-films'} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={'film-cards-box'}>
          {films && films.slice(-3).map((film) => (
            <HomeFilmCards
              key={film.id}
              img={film.posterUrl}
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
      <Button onClick={handleNav} text={'explore full library'} style={{width: '100%'}} />
    </div>
  );
};
