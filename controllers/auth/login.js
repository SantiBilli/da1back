import { v4 } from 'uuid';
import { generateToken } from '../../middlewares/authenticator.js';
import bcrypt from 'bcrypt';
import { loginSVC } from '../../services/auth/login.js';

export const loginCTL = async (req, res) => {
  const bodyParams = req.body;

  const userId = v4();

  const userData = await loginSVC(bodyParams.mail);

  if (userData === null) return res.status(401).json({ message: 'Invalid credentials' }); //401 Unauthorized
  if (userData === 500) return res.status(500).json({ message: 'Internal Server Error' });

  const match = await bcrypt.compare(bodyParams.contrasenia, userData.contrasenia);

  if (!match) return res.status(401).json({ message: 'Invalid credentials' }); //401 Unauthorized

  const token = generateToken({ id_usuario: userData.id_usuario, mail: bodyParams.mail });

  return res.json({
    token: token,
    userData: {
      id_usuario: userData.id_usuario,
      mail: bodyParams.mail,
    },
  });
};
