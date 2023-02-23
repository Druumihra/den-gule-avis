import express from "express";
import cors from "cors";
import { routing } from "./router";

const server = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(routing);

  app.listen(8080, () => {
    console.log("API listening on port", 8080);
  });
};

server().catch((error) => console.error("Failed to start server", error));
