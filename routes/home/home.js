import { Router } from 'express';
import { getDoctorPorEspecialidadCTL, getMedicoPorIdCTL } from '../../controllers/home/home.js';

const homeRouter = Router();

homeRouter.get('/medicos/:especialidad', getDoctorPorEspecialidadCTL);

homeRouter.get('/detalle-medico/:id', getMedicoPorIdCTL);

export default homeRouter;
