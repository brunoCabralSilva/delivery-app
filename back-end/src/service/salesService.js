const { Sale } = require('../database/models');

const create = async (body) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, status,
  } = body;
  if (!status) {
  const sales = await Sale
  .create({ userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: Date.now(),
    status: 'Pendente',
  });
  return sales;
}
const sales = await Sale.create(body);
return sales; 
};

const findId = async (sellerId) => {
  console.log(sellerId);
  const products = await Sale.findOne({ where: { sellerId } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

const findAll = async (userId) => {
  const sales = await Sale.findAll({ where: { userId,
  } });
  return sales;
};

module.exports = {
  create,
  findId,
  findAll,
};
