import { Router } from 'express';
import passport from 'passport';
import { loginJWT, getProfile, registration } from '../controllers/auth';

const router = Router();

router.post('/registr', registration);

router.get('/login/JWT', loginJWT);
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/google-callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    failureMessage: true,
  }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
);

router.get('/profileGoogle', getProfile);

export default router;
