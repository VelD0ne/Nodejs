import passport, { Profile } from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { users } from '../controllers/auth';
import User from '../entity/user.entity';
import UserRepository from '../repository/user.repostory';

const configJWT = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN,
  };

  passport.use(
    new JWTStrategy(opts, async (jwt_payload, done) => {
      const user = await UserRepository.findOneBy({
        username: jwt_payload.username,
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};

const configGoogle = () => {
  const { GOOGLE_CLIENT_ID } = process.env;
  const { GOOGLE_CLIENT_SECRET } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
    throw new Error('Invalid google secret or id');

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id: string, done) => {
    done(null, id);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/google-callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        let user = await UserRepository.findOneBy({
          id: profile.id,
        });
        if (!user) {
          const newUser = await UserRepository.create({
            username: profile.displayName,
            id: profile.id,
          });
          user = await UserRepository.save(newUser);
        }
        return cb(null, user);
      }
    )
  );
};

export default function configPassport() {
  configJWT();
  configGoogle();
}
