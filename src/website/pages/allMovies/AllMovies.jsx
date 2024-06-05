import Header from '../../components/header/Header';
import './style.scss';
import film from '../../assets/images/interface-essential-paginate-filter-camera-10.svg';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import bg from '../../assets/images/image 37.jpg';
import { FilledButton } from '../../components/button/FilledButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const AllMovies = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(5);

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
        <div className={'all-movies-wrapper'}>
            <div className={'upper-movies-section'}>
                <Header />
                <div className={'all-movies-title'}>
                    <h2>Original Films, Series & More</h2>
                    <img src={film} alt={'all-movies film'} />
                </div>
            </div>
            <div className={'films-cards-am'}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    films.map((film) => (
                        <Link to={`/film-details/${film.id}`} key={film.id} className={'link-to-details-am'}>
                            <div className={'img-am-box'} style={{ backgroundColor: '#000' /* Replace with actual background color if available */ }}>
                                <div className={'poster-am-title'}>
                                    <span className={'all-m-title-card'}>{film.title}</span>
                                    <span className={'date-all-movies'}>{new Date(film.release_date).toLocaleDateString()}</span>
                                </div>
                                <img src={film.posterUrl} className={'am-poster-img'} alt={'am-poster'} />
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div className={'lower-bg-am-box'}>
                <img className={'bg-wrapper-am'} src={bg} alt={'bg-wrapper-am'} />
            </div>
            <FilledButton btnText={'show older'} onClick={handleShowOlderClick} />
            <FooterCreds />
        </div>
    );
};
