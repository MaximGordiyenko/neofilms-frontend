import React, {useEffect, useRef, useState} from 'react';
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
import menuMobile from "../../assets/images/burger-menu.svg";
import {Navbar} from "../../components/navbar/Navbar";
import {HeaderAllMovies} from "./header/HeaderAllMovies";
import {BodyAllMovies} from "./body/BodyAllMovies";

const AllMovies = () => {
    return (
      <div className='all-movies-wrapper'>
        <HeaderAllMovies />
        <BodyAllMovies />
        <FooterCreds/>
      </div>
    );
};

export default AllMovies;
