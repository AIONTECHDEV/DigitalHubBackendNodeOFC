import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { SWAGGER_URL } from './constants';

import { MainController } from "./main.controller"

class App {

    public app: Application;
    public mainController: MainController;

    constructor() {
        this.app = express();
        this.config();
        this.mainController = new MainController(this.app);
    }

    private config() : void {
        this.app.use(bodyParser.json({
            strict: true,
            type: "application/json"
        }));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

}

export default new App().app;