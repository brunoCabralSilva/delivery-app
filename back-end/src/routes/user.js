const { Router } = require('express');
const sellersController = require('../controller/sellersController');
const userController = require('../controller/userController');

const router = Router();

router.get('/sellers', sellersController.findAllSellers);
router.get('/:email', userController);

module.exports = router;
