import express, { Express } from 'express';
import accountRoutes from './routes/account.route';
import categoryGrouRoutes from '@/routes/category-group.route';
import errorHandler from './middlewares/error-handler';

const app: Express = express();
const apiPath = '/api/v1';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiPath, accountRoutes);
app.use(apiPath, categoryGrouRoutes);
app.use(errorHandler);

export default app;
