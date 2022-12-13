const { getUser, findAll, create, deleteUser } = require('../service/userService');
const JwtAuth = require('../utils/Authentication');

const returnIdUser = async (req, res) => {
  const { email } = req.params;
  const user = await getUser(email);
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: 'Usuário não existe no banco de dados' });
};

const returnAllUsers = async (req, res) => {
  const users = await findAll();
  if (users) return res.status(200).json(users);
  return res.status(404).json({ message: 'Banco de dados sem usuários' });
};

const createUser = async (req, res) => {
  if (JwtAuth.validation(req.headers.authorization)) {
  const user = await create();
  if (user) return res.status(200).send('Usuário criado com sucesso');
  }
  return res.status(400).send('Token not found');
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  if (JwtAuth.validation(req.headers.authorization)) {
  const user = await deleteUser(id);
  if (user) return res.status(200).send('Usuário deletado com sucesso');
  return res.status(404).send('Falha ao excluir usuário');
  }
  return res.status(400).send('Token not found');
};

module.exports = { returnIdUser, returnAllUsers, createUser, deleteUsers };