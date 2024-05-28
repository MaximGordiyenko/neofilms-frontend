import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import '../../pages/casting/castFilms/style.scss';
import './style.css';

const CastFilmCard = ({ ...rest }) => {
  const isMobile = window.innerWidth <= 430;
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/casting${rest.path}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={'cast-card-wrapper'}>
      <div className={'cast-card-title'}>
        <p className="cast-title">{rest.name}</p>
        <p className="cast-roles">{rest.roles} roles</p>
      </div>
      {isMobile ? (
        <img src={rest.img} alt={'img-mob'} className={'mobile-card-img'} />
      ) : (
        <div
          className={'cast-card'}
          style={{
            backgroundImage: `url(${rest.img})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      )}
      <p className="cast-desc">{rest.movieDes}</p>
      <Button text={'explore roles'} style={{ width: '150px' }} onClick={navigateToDetails} />
    </div>
  );
};

CastFilmCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  movieDes: PropTypes.string,
};

export default CastFilmCard;
