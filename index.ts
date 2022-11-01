import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the most epic server of all time, server of Daniil Volosevich The Greatest');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
})