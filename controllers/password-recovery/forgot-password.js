import { emailExistsSVC } from '../../services/auth/register.js';
import {
  userTokenSVC,
  obtainUserTokenSVC,
  updatePasswordSVC,
  deleteTokenSVC,
} from '../../services/password-recovery/forgot-password.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const forgotPasswordCTL = async (req, res) => {
  const bodyParams = req.body;

  const verifyEmail = await emailExistsSVC(bodyParams.mail);

  if (verifyEmail == null) return res.status(200).send({ message: 'Correo no registrado' });
  if (verifyEmail == 500) return res.status(500).send({ message: 'Internal Server Error' });

  const resetToken = crypto.randomBytes(3).toString('hex');
  const expireToken = new Date(Date.now() + 3600000);

  console.log(new Date(Date.now()).toISOString());
  console.log(new Date(Date.now() + 3600000).toISOString());
  console.log(expireToken.toISOString());

  const token = await userTokenSVC(bodyParams.mail, resetToken, expireToken);

  if (token == 500) return res.status(500).send({ message: 'Internal Server Error' });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'smartswapsip@gmail.com',
      pass: 'errz tzzp rija oxkn',
    },
  });

  var mailOptions = {
    from: 'smartswapsip@gmail.com',
    to: bodyParams.mail,
    subject: 'Cambiar Contraseña',
    html: `
    <div style="max-width: 400px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cceeff; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
      <h2 style="color: #00aaff; margin-bottom: 10px;">Recuperación de Contraseña</h2>
      <p style="color: #333;">Usa el siguiente token para cambiar tu contraseña:</p>
      <div style="margin-top: 15px; padding: 10px; background-color: #e6f7ff; color: #0077aa; font-size: 18px; border-radius: 6px; border: 1px dashed #00aaff; display: inline-block;">
        ${resetToken}
      </div>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).send({ message: 'Error al enviar el correo: ' + error.message });
    } else {
      return res.status(200).send({ message: 'Correo enviado: ' + info.response });
    }
  });
};

export const changePasswordCTL = async (req, res) => {
  const { token } = req.params;
  const password = req.body.contrasenia;
  const tokenData = await obtainUserTokenSVC(token);

  if (tokenData == null) return res.status(498).send({ message: 'Token no valido' });
  if (tokenData == 500) return res.status(500).send({ message: 'Internal Server Error' });

  if (tokenData.dateExpire < Date.now()) return res.status(498).send({ message: 'Token expirado' });

  if (password != null) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const update = await updatePasswordSVC(tokenData.id_usuario, hashPassword);
    if (update == 500) return res.status(500).send({ message: 'Internal Server Error' });

    const deleteToken = await deleteTokenSVC(tokenData.id_usuario);
    if (deleteToken == 500) return res.status(500).send({ message: 'Internal Server Error' });

    return res.status(200).send({ message: 'Contraseña cambiada correctamente' });
  }

  return res.status(200).send({ message: 'Token valido' });
};

export const validateTokenCTL = async (req, res) => {
  const { token } = req.params;

  const tokenData = await obtainUserTokenSVC(token);

  if (tokenData == null) return res.status(498).send({ message: 'Token no valido' });
  if (tokenData == 500) return res.status(500).send({ message: 'Internal Server Error' });
  if (tokenData.dateExpire < Date.now()) return res.status(498).send({ message: 'Token expirado' });

  return res.status(200).send({ message: 'Token valido' });
};
