const productService = require('../service/productService');
require('dotenv').config();

const findAllProduct = async (req, res) => {
  const product = await productService.findAll();
  if (!product) {
    return res.status(404).send('Not found');
  }
  return res.status(200).json(product);
};

const findIdProduct = async (req, res) => {
  const product = await productService.findId(req.params.id);
  try {
    if (!product) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'deu ruim' });
  }
};

module.exports = {
  findAllProduct,
  findIdProduct,
};