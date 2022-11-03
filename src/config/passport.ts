import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { users } from '../controllers/auth';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN,
};

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
    const user = users.find((elem) => elem.username === jwt_payload.username);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
    // or you could create a new account
  })
);
