import React from 'react';
import './style.scss';
import { CastFilms } from '../castFilms/Film';
import line from '../../../assets/images/cast-footer-geometry.png';
import {useMediaQuery} from "@mui/material";
export const CastingBody = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  return (
    <div className="cast-body">
      <CastFilms />
      {isMobile && <img src={line} className="cast-mob-line"/>}
    </div>
  );
};
