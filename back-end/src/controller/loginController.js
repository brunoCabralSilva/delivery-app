const loginController = (req, res) => {
  const validateEmail = /\S+@\S+\.\S+/;
  const { email, password } = req.body;
  const number = 6;

  if (!validateEmail.test(email) || email === '') {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }

  if (password.length < number) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' });
  }
};

module.exports = loginController;