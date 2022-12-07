const salesService = require('../service/salesService');
const JwtAuth = require('../utils/Authentication');
require('dotenv').config();

const createSales = async (req, res) => {
  const sales = await salesService.create(req.body);
  if (JwtAuth.validation(req.headers.authorization)) {
  try {
    if (!sales) {
      return res.status(404).send('Not found');
    }
    return res.status(201).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Intern error' });
  }
}
return res.status(500).json({ message: 'Token not found' });
};

const findIdSales = async (req, res) => {
  const sale = await salesService.findId(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Intern error' });
  }
};

module.exports = {
  createSales,
  findIdSales,
};