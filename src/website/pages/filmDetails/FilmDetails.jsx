import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';
import './style.scss';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import blackStroke from '../../assets/images/footer-hp-placeholder.svg';
import imdb from '../../assets/images/IMDb.png';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, getMoviePoster } from '../../../admin_panel/store/thunk/movie.api';

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(getMoviePoster(id));
  }, [dispatch, id]);
  
  const {
    title,
    description,
    movie_link,
    release_date,
    status,
    directed_by,
    written_by,
    starring
  } = useSelector((state) => state?.movie?.movie);
  
  console.log({
    title,
    description,
    movie_link,
    release_date,
    status,
    directed_by,
    written_by,
    starring
  });
  console.log(id);
  
  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };
  const handleNav = () => {
    navigate(`${film.movie_link}}`, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="movie-details-wrapper">
      <div className="bg-details-box" style={{ backgroundImage: `url(${poster || film.backgroundImg})` }}>
        <Header/>
        <div className="title-details-box">
          <h2>{title}</h2>
          <img src={imdb} alt="imdb" onClick={handleNav}/>
        </div>
      </div>
      <div className="movie-details-desc">
        <div className="announcement">
          <div className="date-release">
            <span>release date</span>
            <h2>{formatDate(release_date)}</h2>
          </div>
          <div className="written-by">
            <span>written by</span>
            <h2>{written_by}</h2>
          </div>
          <div className="directed-by">
            <span>directed by</span>
            <h2>{directed_by}</h2>
          </div>
        </div>
        <div className="desc-text">
          {starring && (
            <>
              <span>starring</span>
              {starring.map((actor, index) => (
                <h3 key={index}>{actor}</h3>
              ))}
            </>
          )}
          <p>{description}</p>
        </div>
      </div>
      <img src={blackStroke} alt="black-stroke-details" className="stroke-placeholder-det"/>
      <FooterCreds/>
    </div>
  );
};

export default FilmDetails;
