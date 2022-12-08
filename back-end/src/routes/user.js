const { Router } = require('express');
const sellersController = require('../controller/sellersController');
const userController = require('../controller/userController');
const salesController = require('../controller/salesController');

const router = Router();

router.get('/sellers', sellersController.findAllSellers);
router.get('/orders/:id', salesController.findUserSales);
router.get('/:email', userController.returnIdUser);

module.exports = router;
