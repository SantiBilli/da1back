import{ emailExistsSVC } from '../../services/auth/register.js';
import { userTokenSVC, obtainUserTokenSVC, updatePasswordSVC, deleteTokenSVC } from '../../services/password-recovery/forgot-password.js';
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
                  <p>Token de recuperacion: ${resetToken}</p>
                  `,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).send({ message: 'Error al enviar el correo: ' + error.message});
      } else {
        return res.status(200).send({ message: 'Correo enviado: ' + info.response});
      }
    });
  };
  
  export const changePasswordCTL = async (req, res) => {
    const { token } = req.params;
    const  password  = req.body.contrasenia;
    const tokenData = await obtainUserTokenSVC(token);
    
    if (tokenData == null) return res.status(200).send({ message: 'Token no valido'});
    if (tokenData == 500) return res.status(500).send({ message: 'Internal Server Error'});
    
    if (tokenData.dateExpire < Date.now()) return res.status(498).send({message: 'Token expirado'});
    
    if (password!=null) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const update = await updatePasswordSVC(tokenData.id_usuario, hashPassword);
      if (update == 500) return res.status(500).send({ message: 'Internal Server Error'});

      const deleteToken = await deleteTokenSVC(tokenData.id_usuario);
      if (deleteToken == 500) return res.status(500).send({ message: 'Internal Server Error'});

      return res.status(200).send({ message: 'Contraseña cambiada correctamente'});
    }

    return res.status(200).send({ message: 'Token valido'});
  };