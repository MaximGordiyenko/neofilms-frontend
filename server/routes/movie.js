import express from 'express';
import { getMovies, addMovie, getMovie, deleteMovieById } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/pages/movies', getMovies);
router.get('/pages/movie/:movie_id', getMovie);

router.post('/pages/movie/create', addMovie);

router.delete('/pages/movie/:movie_id', deleteMovieById);

export default router;
