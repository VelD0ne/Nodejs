import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(router);

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
  });
};

start();
