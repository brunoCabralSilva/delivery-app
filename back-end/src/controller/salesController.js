const salesService = require('../service/salesService');
const productService = require('../service/productService');

const JwtAuth = require('../utils/Authentication');
require('dotenv').config();

const createSales = async (req, res) => {
  const sales = await salesService.create(req.body);
  if (JwtAuth.validation(req.headers.authorization)) {
  try {
    return res.status(201).json({ id: sales });
  } catch (error) {
    return res.status(404).json({ message: 'Internal error' });
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
    res.status(400).json({ message: 'Intern0 error' });
  }
};

const findSaleById = async (req, res) => {
  const sale = await salesService.findSaleById(req.params.id);
  try {
    if (!sale) {
      return res.status(404).send('Not found');
    }
    const productIds = await salesService.findSaleProducts(sale.id);
    const products = await productService.findProductsArray(productIds);
    // console.log(sale);
    const dataValue = JSON.parse(JSON.stringify(products));
    const listProducts = await Promise.all(dataValue.map(async (element) => {
      const quant = await salesService.findQuantity(sale.id, element.id);
      // console.log(element);
      return { ...element, quant };
    }));
    const saleValue = JSON.parse(JSON.stringify(sale));
    return res.status(200).json({ ...saleValue, list: listProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // return res.status(200).json(products);
};

module.exports = {
  createSales,
  findIdSales,
  findUserSales,
  findSaleById,
};