import { Router } from 'express';
import { validateToken } from '../middlewares/authenticator.js';

const pingRouter = Router();

/**
 * @swagger
 * /api/ping:
 *   get:
 *     tags: [Ping]
 *     summary: Responds with "pong!"
 *     description: A simple health check endpoint that returns "pong!" when accessed.
 *     responses:
 *       200:
 *         description: Successful response with "pong!" message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: pong!
 */

pingRouter.get('/ping', validateToken, (req, res) => {
  console.log(req.jwtData);

  res.send('pong!');
});

export default pingRouter;
