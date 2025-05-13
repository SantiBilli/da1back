import { Router } from 'express';
import { getMedicoPorIdCTL, getDoctorPorEspecialidadCTL } from '../../controllers/auth/home/home.js';

const homeRouter = Router();

homeRouter.get('/medicos/:especialidad', getDoctorPorEspecialidadCTL)

homeRouter.get('/detalle-medico/:id', getMedicoPorIdCTL)

export default homeRouter;