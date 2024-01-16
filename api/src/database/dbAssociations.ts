import MovieModel from './movieModel';
import MovieRatingModel from './MovieRatingModel';

MovieModel.hasMany(MovieRatingModel);
MovieRatingModel.belongsTo(MovieModel);