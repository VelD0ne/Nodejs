import { Router } from 'express';
import { welcomePage } from '../controllers/welcome';

const router = Router();

router.get('/', welcomePage);

export { router };
