import { Router } from 'express';
import { loginCTL } from '../../controllers/auth/login.js';

const loginRouter = Router();

loginRouter.post('/logins', loginCTL);

export default loginRouter;
