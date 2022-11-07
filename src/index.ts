import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import router from './routes/index';
import configSession from './config/session';
import configPassport from './config/passport';
import dataSource from './data-source';

const app: Express = express();
const port = process.env.PORT;

const start = async () => {
  await dataSource.initialize();
  console.log('Data source has been initialized');

  app.use(session(configSession()));
  app.use(passport.authenticate('session'));

  app.use(express.json());

  app.use(router);

  configPassport();
  app.use(passport.initialize());

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

start().catch(console.error);
