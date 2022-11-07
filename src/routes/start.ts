import { Router } from 'express';
import { secretPage, welcomePage } from '../controllers/welcome';

const router = Router();

router.get('/', welcomePage);

router.get('/secret', secretPage);

export default router;
