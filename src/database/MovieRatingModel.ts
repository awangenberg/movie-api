import { DataTypes, Model } from "sequelize";
import { EnumType } from "typescript";
import { SequelizeConnection } from "./sequelize";

export default class MovieRating extends Model {
    id!: number

    movieId!: number;

    rating!: number;
}

const sequelizeConnection = SequelizeConnection.getInstance();

MovieRating.init(
    {
        id: {
            field: "id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        movieId: {
            field: 'movieId',
            type: DataTypes.INTEGER,
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