import dotenv from 'dotenv';
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import router from './routes/index';
import configSession from './config/session';
import configPassport from './config/passport';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(session(configSession()));
app.use(passport.authenticate('session'));

app.use(express.json());

app.use(router);

configPassport();
app.use(passport.initialize());

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

start();
