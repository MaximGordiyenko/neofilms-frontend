import Spinner from "../../../components/loader/Spinner";
import {Link} from "react-router-dom";
import mobLine from "../../../assets/images/cast-footer-geometry.png";
import React, {useEffect, useRef, useState} from "react";
import './style.css';
import {useMediaQuery} from "@mui/material";
import {getMovies, getPoster} from "../../../../api/movie";
import {FilledButton} from "../../../components/button/FilledButton";

export const BodyAllMovies = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navbarRef = useRef(null);


  const isMobile = useMediaQuery('(max-width: 430px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      if (!isLoading && hasScrolled) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  }, [isLoading, hasScrolled]);
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
        const sortedMovies = moviesWithPosters.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        setFilms(sortedMovies);
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
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <div className='films-cards-am'>
      <div className="cards-all-m-box">
        {loading ? (
          <Spinner/>
        ) : (
          films.slice(0, currentPage * cardsPerPage).map((film) => (
            <Link to={`/film-details/${film.id}`} key={film.id} className='link-to-details-am'>
              <div className='img-am-box' style={{backgroundColor: '#000'}}>
                <div className='poster-am-title'>
                  <span className='all-m-title-card'>{film.title}</span>
                  <span className='date-all-movies'>{formatDate(film.release_date)}</span>
                </div>
                <img src={film.posterUrl} className='am-poster-img' alt='am-poster'/>
              </div>
            </Link>
          ))
        )}
      </div>
      {isMobile && <img src={mobLine} alt='' className='mob-line'/>}
      <FilledButton btnText={'show older'} onClick={handleShowOlderClick}/>
    </div>
  )
}