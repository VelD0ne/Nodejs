import { Profile } from 'passport';
import { Session } from 'express-session';
import User from '../user';

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: Profile;
      profile?: Profile;
      session?: Session;
    }
  }
}
