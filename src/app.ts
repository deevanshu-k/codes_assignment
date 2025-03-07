import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser = require("body-parser");

dotenv.config();
const app = express();

// Import env variables
const HOST = String(process.env.HOST);
const PORT = Number(process.env.PORT);

app.use(bodyParser.json());

app.use("/v1/api", routes);

app.listen(PORT, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
