import React from 'react';
import './style.scss';
import { CastFilms } from '../castFilms/Film';
const isMobile = window.innerWidth <= 430;
export const CastingBody = () => {
  return (
    <div className="cast-body">
      <CastFilms />
    </div>
  );
};
