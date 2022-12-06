const salesService = require('../service/salesService');
const JwtAuth = require('../utils/Authentication');
require('dotenv').config();

const createSales = async (req, res) => {
  const sales = await salesService.create(req.body);
  console.log(req.headers.authorization);
  if (JwtAuth.validation(req.headers.authorization)) {
  try {
    if (!sales) {
      return res.status(404).send('Not found');
    }
    return res.status(201).send('Created');
  } catch (error) {
    return res.status(500).json({ message: 'deu ruim' });
  }
}
return res.status(500).json({ message: 'deu ruim 2' });
};

const findIdSales = async (req, res) => {
  const sale = await salesService.findId(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'deu ruim' });
  }
};

module.exports = {
  createSales,
  findIdSales,
};