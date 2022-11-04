import User from '../user';

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}