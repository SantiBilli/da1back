import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pingRouter from './routes/ping.js';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';
import loginRouter from './routes/auth/login.js';
import registerRouter from './routes/auth/register.js';
import authRouter from './routes/auth/authUser.js';

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

app.listen(PORT, () => {
  console.log(`Server listening on https//localhost:${PORT}`);
});
