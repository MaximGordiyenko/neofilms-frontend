import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/header/Header';
import Spinner from '../../components/loader/Spinner';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import { FilledButton } from '../../components/button/FilledButton';
import film from '../../assets/images/interface-essential-paginate-filter-camera-10.svg';
import bg from '../../assets/images/image 37.jpg';
import mobLine from '../../assets/images/cast-footer-geometry.png';
import './style.scss';
import {getMovies, getPoster} from "../../../api/movie";

export const AllMovies = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(5);

    const isMobile = useMediaQuery('(max-width: 430px)');


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await getMovies();
                const movies = response.data;

                const moviesWithPosters = movies.map((movie) => ({
                    ...movie,
                    posterUrl: getPoster(movie.id),
                }));

                setFilms(moviesWithPosters);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleShowOlderClick = () => {
        setCardsPerPage(cardsPerPage * 2);
        setCurrentPage(currentPage + 1);
    };

    return (
      <div className='all-movies-wrapper'>
          <div className='upper-movies-section'>
              <Header />
              <div className='all-movies-title'>
                  <h2>Original Films, Series & More</h2>
                  <img src={film} alt='all-movies film' />
              </div>
          </div>
          <div className='films-cards-am'>
              {loading ? (
                <Spinner />
              ) : (
                films.slice(0, currentPage * cardsPerPage).map((film) => (
                  <Link to={`/film-details/${film.id}`} key={film.id} className='link-to-details-am'>
                      <div className='img-am-box' style={{ backgroundColor: '#000' }}>
                          <div className='poster-am-title'>
                              <span className='all-m-title-card'>{film.title}</span>
                              <span className='date-all-movies'>{new Date(film.release_date).toLocaleDateString()}</span>
                          </div>
                          <img src={film.posterUrl} className='am-poster-img' alt='am-poster' />
                      </div>
                  </Link>
                ))
              )}
              {isMobile && <img src={mobLine} alt='' className='mob-line' />}
          </div>
          <div className='lower-bg-am-box'>
              <img className='bg-wrapper-am' src={bg} alt='bg-wrapper-am' />
          </div>
          <FilledButton btnText={'show older'} onClick={handleShowOlderClick} />
          <FooterCreds />
      </div>
    );
};
