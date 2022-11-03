import { Router } from 'express';
import start from './start';
import auth from './auth';

const router = Router();

router.use(start);
router.use(auth);

export default router;
