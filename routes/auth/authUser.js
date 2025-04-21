import { Router } from 'express';
import { validateToken } from '../../middlewares/authenticator.js';

const authRouter = Router();

/**
 * @swagger
 * /api/authentications:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Validar un token JWT
 *     description: Verifica si el token JWT proporcionado es válido, devolviendo un mensaje de confirmación si la autenticación es exitosa.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Token válido, autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                   example: Token valido
 *       '401':
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token inválido o expirado
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

authRouter.post('/authentications', validateToken, (req, res) => {
  res.status(200).json({ message: 'Token valido' });
});

export default authRouter;
