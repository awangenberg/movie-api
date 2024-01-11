import { DataTypes, Model } from "sequelize";
import { SequelizeConnection } from "./sequelize";
import MovieModel from "./movieModel";

export default class MovieRating extends Model {
    movieRatingId!: number;

    movieId!: number;

    rating!: number;
}

const sequelizeConnection = SequelizeConnection.getInstance();

MovieRating.init(
    {
        movieRatingId: {
            field: "movieRatingId",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        movieId: {
            field: "movieId",
            type: DataTypes.INTEGER,
            references: {
                model: MovieModel,
                key: 'movieId',
              },
        },
        rating: {
            field: 'rating',
            type: DataTypes.FLOAT
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "movieRatings",
        modelName: "MovieRating",
    },
);
MovieRating.sync().then();