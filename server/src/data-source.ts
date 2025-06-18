import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Questions } from "./entities/Questions"
/* environment config object */
// const config = {
//     env: process.env.NODE_ENV || "development",
//     development: {
//       host: process.env.DB_HOST || "127.0.0.1",
//       db: process.env.DB_DATABASE || "",
//       user: process.env.DB_USER || "",
//       password: process.env.DB_PASSWORD || "",
//       port: process.env.DB_PORT || 5432,
//     },
//     production: {
//       host: process.env.DB_HOST || "127.0.0.1",
//       db: process.env.DB_DATABASE || "",
//       user: process.env.DB_USER || "",
//       password: process.env.DB_PASSWORD || "",
//       port: process.env.DB_PORT || 5432,
//     },
//   };

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "valentino",
    password: "valery",
    database: "starter-dev",
    synchronize: true,
    logging: true,
    entities: [User, Questions],
    migrations: ["dist/migrations/*.js"],
    subscribers: [],
})
