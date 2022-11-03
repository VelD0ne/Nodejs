import { Router } from 'express';
import passport from 'passport';
import { Jwt } from 'jsonwebtoken';
import { loginJWT, getProfile, registration } from '../controllers/auth';

const router = Router();

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
);
router.post('/login/JWT', loginJWT);
router.post('/registr', registration);

export default router;
