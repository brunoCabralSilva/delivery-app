const JwtAuth = require("../utils/Authentication");

const regex = /\S+@\S+\.\S+/;
const number = 6;

module.exports = class Validate {
  static validateToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ message: 'Token invalid' });
    }
    if (!JwtAuth.validation(authorization)) {
      return res.status(400).json({ message: 'Token invalid' });
    }
    next();
  }
}