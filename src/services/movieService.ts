import Movies from "../database/movies";
import { SequelizeConnection } from "../database/sequelize";
import { Movie } from "../model/movie";

export const createNewMovie = async (newMovie :Movie) => {

  var createdMovie = await Movies.create({
    title: newMovie.title, 
    description: newMovie.description, 
    rating: newMovie.rating,
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

export const getMovies = async () => {

  const movies = await Movies.findAll();
  return movies;
};

export const createMovie = async (movie: Movie) => {

  const movies = await Movies.findAll();
  return movies;
};