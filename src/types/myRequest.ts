import { Request } from 'express';
import User from './user';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

// export interface UserInfoRequest extends Request {
//     user?: User;
// }

// export {}
