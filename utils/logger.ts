import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';

const prettyStream = new PrettyStream({ mode: 'dev' });
prettyStream.pipe(process.stdout);

const streams: bunyan.Stream[] = [{ stream: prettyStream, level: 'info' }];

export const logger = bunyan.createLogger({
  name: 'budget-backend',
  streams: streams,
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception thrown', err);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', reason);
});

