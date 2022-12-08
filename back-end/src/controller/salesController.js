const salesService = require('../service/salesService');
const JwtAuth = require('../utils/Authentication');
require('dotenv').config();

const createSales = async (req, res) => {
  const sales = await salesService.create(req.body);
  if (JwtAuth.validation(req.headers.authorization)) {
  try {
    return res.status(201).json({ id: sales });
  } catch (error) {
    return res.status(404).json({ message: 'Intern error' });
  }
}
return res.status(400).json({ message: 'Token not found' });
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

const findUserSales = async (req, res) => {
  const sale = await salesService.userFindSales(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Intern error' });
  }
};

module.exports = {
  createSales,
  findIdSales,
  findUserSales,
};