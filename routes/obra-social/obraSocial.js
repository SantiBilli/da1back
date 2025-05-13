import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';
import {
  validarObraSocialCTL,
  getObrasSocialesCTL,
  getPlanesObraSocialCTL,
} from '../../controllers/obra-social/obraSocial.js';

const obraSocialRouter = Router();

obraSocialRouter.get('/validar-obra-social', validateToken, validarObraSocialCTL);

obraSocialRouter.get('/obras-sociales', validateToken, getObrasSocialesCTL);

obraSocialRouter.get('/obras-sociales/planes/:id', validateToken, getPlanesObraSocialCTL);

export default obraSocialRouter;