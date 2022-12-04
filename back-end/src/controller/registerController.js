const { 
  exists,
  registerUser,
  getUser,
  validationName,
  validationEmail,
  validationPassword,
} = require('../service/registerService');

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const verifyExists = await exists(name, email);
  if (validationName(name) || validationEmail(email) || validationPassword(password)) {
    res.status(400).json({ message: 'Invalid data for submission.' });
  }
  if (verifyExists) return res.status(409).json({ message: 'This name or email already exists.' });
  await registerUser(name, email, password);
  const user = await getUser(email);
  return res.status(201).json(user);
};

module.exports = registerController;