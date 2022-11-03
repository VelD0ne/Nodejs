import User from '../user';

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// export interface UserInfoRequest extends Request {
//     user?: User;
// }

// export {}
