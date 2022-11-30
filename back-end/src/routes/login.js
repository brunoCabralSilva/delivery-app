const { router } = require('express');
const { emailValidate, passwordValidate } = require('../middlewares/LoginMid');

router.post('/', emailValidate, passwordValidate);

module.exports = router;
