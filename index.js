import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pingRouter from './routes/ping.js';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';
import loginRouter from './routes/auth/login.js';
import registerRouter from './routes/auth/register.js';
import authRouter from './routes/auth/authUser.js';
import turnosRouter from './routes/turnos/turnos.js';
import homeRouter from './routes/home/home.js';
import obraSocialRouter from './routes/obra-social/obraSocial.js';
import forgotPasswordRouter from './routes/password-recovery/forgot-password.js';
import changePasswordRouter from './routes/profile/change-password.js';
import profileRouter from './routes/profile/profile.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pfpDirectory = path.join(__dirname, 'uploads/pfp');
const medicosDirectory = path.join(__dirname, 'uploads/medicos');

const app = express();
const PORT = process.env.PORT || 3550;

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api', pingRouter);
app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', authRouter);
app.use('/api', turnosRouter);
app.use('/api', homeRouter);
app.use('/api', obraSocialRouter);
app.use('/api', forgotPasswordRouter);
app.use('/api', changePasswordRouter);
app.use('/api', profileRouter);

app.use('/api/imagen-pfp/', express.static(pfpDirectory));
app.use('/api/imagen-medico/', express.static(medicosDirectory));

app.listen(PORT, () => {
  console.log(`Server listening on https//localhost:${PORT}`);
});
