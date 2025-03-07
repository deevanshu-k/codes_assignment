import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser = require("body-parser");
import { SOMETHING_WENT_WRONG } from "./utils/message.util";
import path from "path";

dotenv.config();
const app = express();

// Import env variables
const HOST = String(process.env.HOST);
const PORT = Number(process.env.PORT);

app.use(bodyParser.json());

// Set the template engine as pug
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.use("*", (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && err.code && err.message) {
        if (err.info) console.log(err.info); // Log error

        res.status(err.code).json({
            code: err.code,
            message: err.message,
        });
    } else {
        // Unknown error
        res.status(500).json({
            code: 500,
            message: SOMETHING_WENT_WRONG,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
