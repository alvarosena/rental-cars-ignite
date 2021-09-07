import express, { json } from 'express';

import './database';

import "./shared/container";

import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.listen(8080, () => console.log("Sever is running on http://localhost:8080"));