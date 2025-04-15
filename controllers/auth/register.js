import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { emailExistsSVC, registerUserSVC } from '../../services/auth/register.js';

export const registerCTL = async (req, res) => {
  const bodyParams = req.body;

  const verifyEmailExists = await emailExistsSVC(bodyParams.mail);

  if (verifyEmailExists === 500) return res.status(500).json({ message: 'Internal Server Error' });
  if (verifyEmailExists === 409) return res.status(409).json({ message: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(bodyParams.contrasenia, salt);

  const userId = v4();

  const registerUser = await registerUserSVC(
    userId,
    bodyParams.nombre,
    bodyParams.apellido,
    bodyParams.mail,
    hashedPassword
  );

  if (registerUser == 500) return res.status(500).json({ message: 'Internal Server Error' });

  return res.status(201).json({ message: 'User created successfully' });
};
