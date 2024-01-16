import { DataTypes, Model } from "sequelize";
import { EnumType } from "typescript";
import { SequelizeConnection } from "./sequelize";
import { Category } from "../model/movie";

export default class MovieModel extends Model {

    movieId!: number;

    title!: string;

    description!: string;

    rating!: number;

    category!: EnumType;

    releaseDate!: Date;
}

const sequelizeConnection = SequelizeConnection.getInstance();

MovieModel.init(
    {
        movieId: {
            field: "movieId",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
        },
        rating: {
            field: 'rating',
            type: DataTypes.FLOAT
        },
        category: {
            field: 'category',
            type: DataTypes.ENUM({ values: Object.values(Category) }),
        },
        releaseDate: {
            field: 'releaseDate',
            type: DataTypes.DATE,
        }
    },
    {
        sequelize: sequelizeConnection,
        tableName: "movies",
        modelName: "Movie",
    },
);
MovieModel.sync().then();
