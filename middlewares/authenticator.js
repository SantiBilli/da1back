import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = jwtData => {
  return jwt.sign(jwtData, process.env.API_KEY, { expiresIn: '2h' });
};

export const validateToken = (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) return res.status(401).json({ message: 'Access denied' });
  else {
    const clearedToken = accessToken.split(' ')[1].replace(/^"(.*)"$/, '$1');
    jwt.verify(clearedToken, process.env.API_KEY, (err, jwtData) => {
      if (err) {
        return res.status(401).json({ message: 'Access Denied. Token Expirado o Incorrecto' });
      } else {
        req.jwtData = jwtData;
        const newToken = generateToken({ userId: jwtData.userId, email: jwtData.email });
        res.setHeader('Authorization', `Bearer ${newToken}`);

        next();
      }
    });
  }
};
