const { User } = require('../database/models');

const getUser = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  return user;
};

const findAll = async () => {
  const user = await User.findAll();
  return user;
};

const create = async (body) => {
  const user = await User.create(body);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.delete({ where: id });
  return user;
};

module.exports = { getUser, findAll, create, deleteUser };
