import { Router } from 'express';
import { loginCTL } from '../../controllers/auth/login.js';

const loginRouter = Router();

/**
 * @swagger
 * /api/logins:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión de un usuario
 *     description: Autentica a un usuario mediante su correo electrónico y contraseña, devolviendo un token JWT y datos del usuario si las credenciales son válidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - contrasenia
 *             properties:
 *               mail:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: santi@gmail.com
 *               contrasenia:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: asdasd123
 *     responses:
 *       '200':
 *         description: Login exitoso, devuelve un token JWT y datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación en futuras solicitudes
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 userData:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: string
 *                       description: ID único del usuario
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     mail:
 *                       type: string
 *                       format: email
 *                       description: Correo electrónico del usuario
 *                       example: santi@gmail.com
 *       '401':
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials.
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

loginRouter.post('/logins', loginCTL);

export default loginRouter;
