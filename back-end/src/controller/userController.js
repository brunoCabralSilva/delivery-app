const { getUser } = require('../service/userService');

const userController = async (req, res) => {
  const { email } = req.params;
  const user = await getUser(email);
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: 'Usuário não existe no banco de dados' });
};

module.exports = userController;