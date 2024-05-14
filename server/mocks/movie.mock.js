import { Movie } from "../models/movie.model.js";

export const createMovie = async () => {
  try {
    await Movie.sync({ force: true });
    await Movie.bulkCreate([
      {
        "id": "10cdfea0-783c-4d64-956b-4fdfb7ww37f1",
        "movie": {
          "lastModified": 1715079981000,
          "name": "Screenshot 2024-05-07 at 14.06.17.png",
          "path": "Screenshot 2024-05-07 at 14.06.17.png",
          "size": 26444,
          "type": "image/png",
          "webkitRelativePath": ""
        },
        "title": "Hello movie",
        "description": "Lorem impus dolor set",
        "movie_link": "https://youtu.be/SWYtYiIottk?si=FXy6Vmpr0qLC6FmW",
        "release_date": 1715079981000,
        "status": "Production",
        "directed_by": ["Nolan", "Hopkins"],
        "written_by": ["Spilberg", "Henks"],
        "starring": ["Miki Rurk", "David Duhovniy"],
      }
    ]);
    console.log(`${Movie.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
