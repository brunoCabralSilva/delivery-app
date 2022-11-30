const validateEmail = /\S+@\S+\.\S+/;

export function emailValidate(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail.test(email) || email === '') {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  next();
}

export function passwordValidate(req, res, next) {
  const { password } = req.body;
  const number = 6;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < number) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' });
  }
  next();
}