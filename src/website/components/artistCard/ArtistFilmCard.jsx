import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/Button';
import '../../pages/casting/castFilms/style.scss';
import './style.css';

export const ArtistFilmCard = ({ actor_name, bio, onApplyClick }) => {
  return (
    <div className={'actor-card-wrapper'}>
      <div className={'card-title'}>
        <p className="actor-name">{actor_name}</p>
        <p className="actor-bio">{bio}</p>
      </div>
      <Button isGlitch text={'Apply'} style={{ width: '150px' }} onClick={onApplyClick} />{' '}
    </div>
  );
};

ArtistFilmCard.propTypes = {
  actor_name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  onApplyClick: PropTypes.func.isRequired,
};
