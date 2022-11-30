// const passwordValidate = (req, res, next) => {
//   const { password } = req.body;
//   const number = 6;
//   if (!password) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }
//   if (password.length < number) {
//     return res.status(400).json({ message: 'Password must have at least 6 characters' });
//   }
//   next();
// }

// module.export = passwordValidate;