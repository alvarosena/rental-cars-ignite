import express, { json } from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.listen(8080, () => console.log("Sever is running on port 8080"));