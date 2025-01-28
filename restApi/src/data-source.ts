import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Course } from "./entity/Course";

dotenv.config();

const { PG_HOST, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: parseInt(PG_PORT || "5432"),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  synchronize: false,
  logging: false,
  entities: [User, Course],
  migrations: [__dirname + "/migration/*.ts", __dirname + "/migration/*.js"],
  subscribers: [],
});