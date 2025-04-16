import express, { Express, Request, Response } from 'express';
import config from './providers/config';
import { logger } from './utils/logger';
import { httpLogger } from './middlewares/http.logger';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.get('/', (_req: Request, res: Response) => {
  res.send("budget let's goooo!!!!!");
});

app.listen(config.PORT, () => {
  logger.info(
    `\uf00c [server]: Server is running at http://localhost:${config.PORT}`
  );
});
