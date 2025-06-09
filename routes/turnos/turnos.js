import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';
import {
  cancelarTurnoCTL,
  getTurnoByIdCTL,
  getTurnosFechasCTL,
  getTurnosHorariosCTL,
  getTurnosMedicoCTL,
  reservarTurnoCTL,
  turnosStatusCTL,
} from '../../controllers/turnos/turnos.js';
import { getTurnoByIdSVC } from '../../services/turnos/turnos.js';

const turnosRouter = Router();

// turnosRouter.get('/turnos-medico/:id_medico', validateToken, getTurnosMedicoCTL);
turnosRouter.put('/turnos-reservar/:id_turno', validateToken, reservarTurnoCTL);
turnosRouter.put('/turnos-cancelar/:id_turno', validateToken, cancelarTurnoCTL);
turnosRouter.get('/turnos/:status', validateToken, turnosStatusCTL);

turnosRouter.get('/fechas/:id_medico', validateToken, getTurnosFechasCTL);
turnosRouter.get('/horarios/:id_medico/:fecha', validateToken, getTurnosHorariosCTL);
turnosRouter.get('/turnos-info/:id_turno', validateToken, getTurnoByIdCTL);

export default turnosRouter;
