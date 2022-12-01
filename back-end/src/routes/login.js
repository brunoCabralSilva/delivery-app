const { Router } = require('express');
const loginController = require('../controller/loginController');
const LoginMiddlewares = require('../middlewares/loginMiddleware');

const router = Router();

router.post(
  '/',
  LoginMiddlewares.validateEmail,
  LoginMiddlewares.validatePassword,
  loginController,
);

module.exports = router;
