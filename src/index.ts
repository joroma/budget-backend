import express, { Express, Request, Response } from "express";
import config from "./providers/config";
import bodyParser from "body-parser";
import { logger } from "./utils/logger";
import accountRouter from "./routes/account.router";
import { httpLogger } from "./middlewares/http.logger";
import categoryRouter from "./routes/category.router";

const app: Express = express();

// Add body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.get("/", (req: Request, res: Response) => {
  res.send("budget let's goooo!!!!!");
});

const myVariable: number = "john roger";


app.use(accountRouter, categoryRouter);

app.listen(config.PORT, () => {
  logger.info(
    `\uf00c [server]: Server is running at http://localhost:${config.PORT}`,
  );
});
