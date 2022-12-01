const { Router } = require('express');
const productController = require('../controller/productController');

const router = Router();

// router.post('/', loginMiddle.validateEmail, loginMiddleware.validatePassword, loginController);

router.get(
  '/',
  productController.findAllProduct,
);
router.get(
  '/:id',
  productController.findIdProduct,
);

module.exports = router;
