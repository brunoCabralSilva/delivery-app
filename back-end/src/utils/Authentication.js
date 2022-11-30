import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class Authentication {

  tokenSecret;
  jwtConfig;
  
  constructor() {
    this.tokenSecret = process.env.JWT_SECRET || "GRUPO-9-É-DEMAIS";
    this.jwtConfig = { expiresIn: '10min', algorithm: 'HS256' };
  }
  
  validation (token) {
    try {
      const validate = jwt.verify(token, tokenSecret);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  generate (data) {
    const token = jwt.sign(...data, this.tokenSecret, this.jwtConfig);
    return token;
  };
}
