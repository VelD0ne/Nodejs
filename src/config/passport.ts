import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { users } from '../controllers/auth';
import User from '../@types/user';

const configPassport = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN,
  };

  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      const user = users.find((elem) => elem.username === jwt_payload.username);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
      // or you could create a new account
    })
  );

  const { GOOGLE_CLIENT_ID } = process.env;
  const { GOOGLE_CLIENT_SECRET } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
    throw new Error('Invalid google secred or id');

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/google-callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        cb(null, profile);
      }
    )
  );
};

configPassport();
