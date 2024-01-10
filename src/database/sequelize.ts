import {  Dialect, Sequelize} from "sequelize";
import dbConfig from "./db.config";

export class SequelizeConnection {

    private static instance: Sequelize;

    private constructor() {
        const dbName = dbConfig.DB
        const dbUser = dbConfig.USER
        const dbHost = dbConfig.HOST
        const dbDriver = dbConfig.DRIVER as Dialect
        const dbPassword = dbConfig.PASSWORD

        SequelizeConnection.instance = new Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: dbDriver
        })

        SequelizeConnection.instance.authenticate().then(() => {
            console.log('Sequelize connected')
        })
    }

    public static getInstance(): Sequelize {
        if (!SequelizeConnection.instance) {
            new SequelizeConnection();
        }

        return SequelizeConnection.instance;
    }
}
