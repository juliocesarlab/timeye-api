import cors from "cors";
import express, { Application } from "express";
import routes from "./routes/routes";
import "./services/database/index";

class App {
  public server: Application;
  PORT = process.env.PORT;

  constructor() {
    this.server = express();
    this.server.listen(this.PORT || 5000);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
