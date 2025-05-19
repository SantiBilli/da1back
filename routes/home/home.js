import { Router } from 'express';
import { getDoctorPorEspecialidadCTL, getMedicoPorIdCTL } from '../../controllers/home/home.js';
import { validateToken } from '../../middlewares/authenticator.js';

const homeRouter = Router();

homeRouter.get('/medicos/:especialidad', validateToken, getDoctorPorEspecialidadCTL);

homeRouter.get('/detalle-medico/:id', validateToken, getMedicoPorIdCTL);

export default homeRouter;
