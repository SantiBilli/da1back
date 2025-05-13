import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';
import {
  cancelarTurnoCTL,
  getTurnosMedicoCTL,
  reservarTurnoCTL,
  turnosStatusCTL,
} from '../../controllers/turnos/turnos.js';

const turnosRouter = Router();

turnosRouter.get('/turnos-medico/:id_medico', validateToken, getTurnosMedicoCTL);
turnosRouter.put('/turnos-reservar/:id_turno', validateToken, reservarTurnoCTL);
turnosRouter.put('/turnos-cancelar/:id_turno', validateToken, cancelarTurnoCTL);
turnosRouter.get('/turnos/:status', validateToken, turnosStatusCTL);

export default turnosRouter;
