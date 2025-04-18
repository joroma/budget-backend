import env from './providers/config';
import { logger } from './utils/logger';
import app from './app';

app.listen(env.PORT, () => {
  logger.info(
    `\uf00c [server]: Server is running at http://localhost:${env.PORT}`
  );
});
