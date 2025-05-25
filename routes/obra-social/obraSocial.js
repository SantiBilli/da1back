import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';
import {
  validarObraSocialCTL,
  getObrasSocialesCTL,
  getPlanesObraSocialCTL,
  registrarObraSocialCTL,
} from '../../controllers/obra-social/obraSocial.js';

const obraSocialRouter = Router();

obraSocialRouter.get('/validar-obra-social', validateToken, validarObraSocialCTL);

obraSocialRouter.get('/obras-sociales', validateToken, getObrasSocialesCTL);

obraSocialRouter.get('/obras-sociales/planes/:id', validateToken, getPlanesObraSocialCTL);

obraSocialRouter.post('/obras-sociales/registrar', validateToken, registrarObraSocialCTL);

export default obraSocialRouter;
