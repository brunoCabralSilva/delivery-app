const { Router } = require('express');
const sellersController = require('../controller/sellersController');

const router = Router();

router.get('/sellers', sellersController.findAllSellers);

module.exports = router;
