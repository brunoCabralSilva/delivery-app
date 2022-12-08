const { Sale } = require('../database/models');
const { SaleProduct } = require('../database/models');

const createSalesProducts = async (id, list) => {
  try {
    list.forEach(async (array) => {
      await SaleProduct.create({
        saleId: id,
        productId: array.id,
        quantity: array.quant,
      });
    });
    return true;
  } catch (error) {
    return false;
  }
};

const create = async (body) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, list,
  } = body;
  const sales = await Sale
  .create({ userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: Date.now(),
    status: 'Pendente',
  });
  const createSell = createSalesProducts(sales.dataValues.id, list);
  if (createSell) {
  return sales.dataValues.id;
  }
  return null;
};

const findId = async (sellerId) => {
  const products = await Sale.findOne({ where: { sellerId } });
  if (!products) throw new Error('Produto não existe');
  return products;
};

const userFindSales = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  if (!sales) throw new Error('Produto não existe');
  return sales;
};

module.exports = {
  create,
  findId,
  userFindSales,
};
