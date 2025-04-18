import express, { Express } from 'express';
import accountRoutes from './routes/account.route';
import errorHandler from './middlewares/error-handler';

const app: Express = express();
const apiPath = '/api/v1';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiPath, accountRoutes);
app.use(errorHandler);

export default app;
