const jwt = require('jsonwebtoken');

const tokenSecret = process.env.JWT_SECRET || 'GRUPO-9-É-DEMAIS';
require('dotenv').config();

module.exports = class JwtAuth {
  static validation(token) {
    try {
      jwt.verify(token, tokenSecret);
      return true;
    } catch (error) {
      return false;
    }
  }

  static generate(data) {
    const jwtConfig = { expiresIn: '15d', algorithm: 'HS256' };
    const token = jwt.sign(data.toJSON(), tokenSecret, jwtConfig);
    return token;
  }
};
