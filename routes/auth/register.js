import { Router } from 'express';
import { registerCTL } from '../../controllers/auth/register.js';

const registerRouter = Router();

registerRouter.post('/registers', registerCTL);

export default registerRouter;
