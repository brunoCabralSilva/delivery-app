const { Router } = require('express');
const productController = require('../controller/productController');

const router = Router();

router.get(
  '/products',
  productController.findAllProduct,
);
router.get(
  '/:id',
  productController.findIdProduct,
);

module.exports = router;
