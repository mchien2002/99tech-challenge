import express from "express";
import cors from "cors";
import { AppDataSource } from "./db";
import { auto_import_router } from "./auto.import.router";
import { setupSwagger } from "./swagger";
import { errorHandler } from "./lib/middlewares/error.handle";
import { requestLogger } from "./lib/middlewares/logging";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

auto_import_router(app);
setupSwagger(app);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
