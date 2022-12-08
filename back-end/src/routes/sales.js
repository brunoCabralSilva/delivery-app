const { Router } = require('express');
const salesController = require('../controller/salesController');

const router = Router();

router.get(
  '/:id',
  salesController.findSaleById,
);

module.exports = router;
