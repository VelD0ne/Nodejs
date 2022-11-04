import dotenv from 'dotenv';
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import router from './routes/index';

dotenv.config();

require('./config/passport');

const app: Express = express();
const port = process.env.PORT;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  })
);

app.use(express.json());

app.use(router);

app.use(passport.initialize());

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

start();
