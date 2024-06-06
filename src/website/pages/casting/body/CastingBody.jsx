import React from 'react';
import './style.scss';
import { CastFilms } from '../castFilms/Film';
export const CastingBody = () => {
  return (
    <div className="cast-body">
      <CastFilms />
    </div>
  );
};
