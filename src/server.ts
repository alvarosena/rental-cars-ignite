import express, { json } from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/Specifications.routes';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(8080, () => console.log("Sever is running on port 8080"));