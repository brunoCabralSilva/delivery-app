const md5 = require('md5');
const { User } = require('../database/models');

const exists = async (name, email) => {
  const vEmail = await User.findOne({ where: { email } });
  const vUser = await User.findOne({ where: { name } });
  return !!vEmail || !!vUser;
};

const registerUser = async (name, email, password) => {
  const encryptedPass = md5(password);
  const user = await User.create({ 
    name,
    email,
    password: encryptedPass,
    role: 'customer',
   });
   return !!user;
};

const getUser = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  const { id, name, role } = user;
  return { id, name, email, role };
};

module.exports = { exists, registerUser, getUser };