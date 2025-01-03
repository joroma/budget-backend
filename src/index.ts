import express, { Express, Request, Response } from "express";
import config from "./providers/config";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("budget let's goooo!!!!!");
});

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost${config.port}`);
}); 
