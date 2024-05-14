import { MovieService } from '../services/movie.service.js';

export const getMovies = async (req, res, next) => {
  try {
    const getAllMovies = await MovieService.getMovies();
    return res.status(200).json(getAllMovies);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const [movie] = await MovieService.getMovie(movie_id);
    res.status(200).send(movie);
  } catch (error) {
    next(error);
  }
};

export const addMovie = async (req, res, next) => {
  try {
    const { id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring } = req.body;
    await MovieService.createMovie(id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const id = movie_id;
    const { movie, title, description, movie_link, release_date, status, directed_by, written_by, starring } = req.body;
    console.log(id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring);
    await MovieService.updateMovie(id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring);
    res.status(200).send({ message: 'movie was updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteMovieById = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    await MovieService.deleteMovieById(movie_id);
    res.status(200).send({ message: 'data was deletes' });
  } catch (error) {
    next(error);
  }
};
