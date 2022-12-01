const { Product } = require('../database/models');

const findAll = async () => {
  const products = await Product.findAll();
  return products;
};

const findId = async (id) => {
  console.log(id);
  const products = await Product.findOne({ where: { id } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

module.exports = {
  findAll,
  findId,
};
