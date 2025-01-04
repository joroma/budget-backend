import express, { Express, Request, Response } from "express";
import config from "./providers/config";
import { logger } from "./common/utils/logger";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("budget let's goooo!!!!!");
});

app.listen(config.PORT, () => {
  logger.info(`\uf00c [server]: Server is running at http://localhost:${config.PORT}`);
}); 
