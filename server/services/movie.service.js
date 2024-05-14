import { Movie } from '../models/movie.model.js';

export const MovieService = (() => {
  
  const getMovies = async () => {
    return await Movie.findAll();
  };
  
  const getMovie = async (movie_id) => {
    return await Movie.findAll({
      where: {
        id: movie_id
      }
    });
  };
  
  const createMovie = async (id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring) => {
    await Movie.create({
      "id": id,
      "movie": {
        "lastModified": movie.lastModified || 1715079981000,
        "name": movie.name || "Screenshot 2024-05-07 at 14.06.17.png",
        "path": movie.path || "Screenshot 2024-05-07 at 14.06.17.png",
        "size": movie.size || 26444,
        "type": movie.type || "image/png",
        "webkitRelativePath": ""
      },
      "title": title || "This is next one logo text",
      "description": description || "This is next one additional logo text",
      "movie_link": movie_link || "https://www.google.com/?client=safari",
      "release_date": release_date || 1715079981000,
      "status": status || "Production",
      "directed_by": directed_by || ["Nolan", "Hopkins"],
      "written_by": written_by || ["Spilberg", "Henks"],
      "starring": starring || ["Miki Rurk", "David Duhovniy"],
    });
  };
  
  const updateMovie = async (id, movie, title, description, movie_link, release_date, status, directed_by, written_by, starring) => {
    return await Movie.update({ movie, title, description, movie_link, release_date, status, directed_by, written_by, starring }, {
      where: {
        id: id
      }
    });
  };
  
  const deleteMovieById = async (movie_id) => {
    const deletedCount = await Movie.destroy({
      where: {
        id: movie_id
      }
    });
    
    if (deletedCount === 0) {
      return { success: false, message: 'Slide not found' };
    }
    
    return { success: true, message: 'Slide deleted successfully' };
  };
  
  return {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovieById
  };
})();
