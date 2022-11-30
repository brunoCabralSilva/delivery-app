import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenSecret = process.env.JWT_SECRET || 'GRUPO-9-É-DEMAIS';

export function validation(token) {
  try {
    jwt.verify(token, tokenSecret);
    return true;
  } catch (error) {
    return false;
  }
}

export function generate(data) {
  const jwtConfig = { expiresIn: '10min', algorithm: 'HS256' };
  const token = jwt.sign(...data, tokenSecret, jwtConfig);
  return token;
}
