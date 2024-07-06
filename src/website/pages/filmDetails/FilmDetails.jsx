import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';
import './style.scss';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import blackStroke from '../../assets/images/footer-hp-placeholder.svg';
import imdb from '../../assets/images/IMDb.png';

const FilmDetails = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [poster, setPoster] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setError('Film not found');
            setLoading(false);
            return;
        }
        let isMounted = true;
        const fetchFilmDetails = async () => {
            try {
                const [filmResponse, posterResponse] = await axios.all([
                    axios.get(`http://57.151.104.191:8888/api/pages/movie/${id}`),
                    axios.get(`http://57.151.104.191:8888/api/pages/movie/${id}/poster`, {
                        responseType: 'blob'
                    })
                ]);

                if (isMounted) {
                    setFilm(filmResponse.data);
                    const posterBlob = posterResponse.data;
                    const posterUrl = URL.createObjectURL(posterBlob);
                    setPoster(posterUrl);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch film details or poster');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchFilmDetails();
        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {

    }, []);

    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds);
        return date.toLocaleDateString();
    };
    const handleNav = () => {
        navigate(`${film.movie_link}}`, { replace: true });
        window.scrollTo(0, 0);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!film) {
        return <div>Film not found</div>;
    }

    const { title, starring, release_date, written_by, directed_by } = film;
    console.log(film, 'film')
    return (
        <div className="movie-details-wrapper">
            <div className="bg-details-box" style={{ backgroundImage: `url(${poster || film.backgroundImg})` }}>
                <Header />
                <div className="title-details-box">
                    <h2>{title}</h2>
                    <img src={imdb} alt='imdb' onClick={handleNav}/>
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
                    <p>{film.description}</p>
                </div>
            </div>
            <img src={blackStroke} alt="black-stroke-details" className="stroke-placeholder-det" />
            <FooterCreds />
        </div>
    );
};

export default FilmDetails;
