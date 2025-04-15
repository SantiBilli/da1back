import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';

const authRouter = Router();

authRouter.post('/authentications', validateToken, (req, res) => {
  res.status(200).json({ message: 'Token valido' });
});

export default authRouter;
