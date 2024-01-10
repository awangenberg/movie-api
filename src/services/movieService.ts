import Movies from "../database/movieModel";
import { Movie } from "../model/movie";
import  MovieRatings from "../database/MovieRatingModel";


//TODO: return Promise<Movie> instead of db model in below methods.

export const createNewMovie = async (newMovie :Movie) => {
  const initialRating = 0;

  const createdMovie = await Movies.create({
    title: newMovie.title, 
    description: newMovie.description, 
    rating: initialRating,
    category: newMovie.category,
    releaseDate: newMovie.releaseDate});  
  
  return createdMovie.id;
};

export const getMoviesById = async (id: number) => {

  const movie = await Movies.findByPk(id);
  if (!movie) {
    return null;
  }
  return movie;
};

export const updateRating = async (id: number, newRating: number) => {
  const movie = await Movies.findByPk(id);

  if (!movie) {
    return null;
  }

  await MovieRatings.create({ movieId: movie.id, rating:  newRating});

  const movieRatings = await MovieRatings.findAll({
    where: {
      movieId: movie.id,
    },
      attributes: ['rating']
  });
  
  const ratings: number[] = movieRatings.map(movieRating => movieRating.rating);

  //TODO: fixa foregin key istället för att skapa en ny movieId.
  var average = calculateAverageRating(ratings); //TODO: use average here instead: https://stackoverflow.com/questions/59928730/sequelize-js-how-to-get-average-aggregate-of-associated-model
  
  //TODO: update value in movieDB!

  return movie;
};

export const getMovies = async () => {
  const movies = await Movies.findAll();
  return movies;
};

function calculateAverageRating(ratings: number[]) {
  const sum = ratings.reduce((a, b) => a + b, 0);
  const average = (sum / ratings.length) || 0;

  return average;
}
