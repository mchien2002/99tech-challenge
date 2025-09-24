import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "todos.db",
  synchronize: true,   // ⚠️ chỉ dủng cho dev
  logging: false,
  entities: [__dirname + '/domain/**/entities/*.entity.{ts,js}'],
});
