import { Router } from 'express';
import passport from 'passport';
import {
  loginJWT,
  getProfile,
  registration,
  logout,
} from '../controllers/auth';

const router = Router();

router.post('/registr', registration);

router.get('/JWT', loginJWT);
router.post(
  '/login/JWT',
  passport.authenticate('jwt', { session: true, successRedirect: '/profile' })
);
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/google-callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/profile',
    failureMessage: true,
  })
);

router.delete('/logout', logout); // make it delete later

router.get('/profile', getProfile);

router.get('/profileGoogle', getProfile);

export default router;
