import { Router } from 'express';
import {
  changePasswordCTL,
  forgotPasswordCTL,
  validateTokenCTL,
} from '../../controllers/password-recovery/forgot-password.js';

const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/forgot-password', forgotPasswordCTL);
forgotPasswordRouter.post('/reset-password/:token', changePasswordCTL);
forgotPasswordRouter.post('/validate-token/:token', validateTokenCTL);

export default forgotPasswordRouter;
