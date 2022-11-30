// const validateEmail = /\S+@\S+\.\S+/;

// const emailValidate = (req, res, next) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }
//   if (!validateEmail.test(email) || email === '') {
//     return res.status(400).json({ message: 'Incorrect email or password' });
//   }
//   next();
// }

// module.export = emailValidate;