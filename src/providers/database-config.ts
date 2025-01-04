import { DataSource, DataSourceOptions } from "typeorm";
import config from "./config";
import entities from "../entities";

const dbConfig: DataSourceOptions = {
  type: config.DB_TYPE,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  entities: entities
}

const appDataSource = new DataSource(dbConfig);
appDataSource.initialize();

export default appDataSource; 
