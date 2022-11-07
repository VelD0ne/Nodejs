import { Profile } from 'passport';
import { Session } from 'express-session';
import User from '../../entity/user.entity';

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
