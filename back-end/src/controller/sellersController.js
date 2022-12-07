const sellersService = require('../service/sellersService');
require('dotenv').config();

const findAllSellers = async (req, res) => {
  const Sellers = await sellersService.findAll('seller');
  if (!Sellers) {
    return res.status(404).send('Not found');
  }
  return res.status(200).json(Sellers);
};

module.exports = {
  findAllSellers,
};