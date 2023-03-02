import express from "express";
import cors from "cors";
import { routing } from "./router";
import dotenv from "dotenv";
import { SQLDb } from "./SQLDb";

const server = async () => {
  dotenv.config();

  const sqlDb = new SQLDb();

  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(routing(sqlDb));

  app.listen(8080, () => {
    console.log("API listening on port", 8080);
  });
};

server().catch((error) => console.error("Failed to start server", error));
