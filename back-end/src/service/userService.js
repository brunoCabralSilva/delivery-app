const { User } = require('../database/models');

const getUser = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  return user;
};

module.exports = {
  getUser,
};
