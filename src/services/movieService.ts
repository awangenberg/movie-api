import Movies from "../database/movieModel";
import { Movie } from "../model/movie";
import MovieRatings from "../database/MovieRatingModel";
import "../database/dbAssociations"
import { Sequelize, where } from "sequelize";

//TODO: return Promise<Movie> instead of db model in below methods.
export const createNewMovie = async (newMovie: Movie) => {
  const initialRating = 0;

  const createdMovie = await Movies.create({
    title: newMovie.title,
    description: newMovie.description,
    rating: initialRating,
    category: newMovie.category,
    releaseDate: newMovie.releaseDate
  });

  return createdMovie.movieId;
};

export const getMoviesById = async (id: number) => {

  const movie = await Movies.findByPk(id);
  if (!movie) {
    return null;
  }
  return movie;
};

export const updateRating = async (id: number, newRating: number) => {

  try {
    await MovieRatings.create({
      movieId: id,
      rating: newRating,
    })
  }
  catch (error) {
    if (error instanceof Error
      && error.name === 'SequelizeForeignKeyConstraintError') {
      return null;
    }
  }

  const movieRatings = await MovieRatings.findAll<MovieRatings>({
    where: {
      movieId: id,
    },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('rating')), 'rating']]
  });

  const averageRating = movieRatings[0].rating.toFixed(2);

  console.log(`Average rating: ${averageRating}`)

  Movies.update(
    { rating: averageRating },
    { where: { movieId: id } }
  )

  return averageRating;
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
