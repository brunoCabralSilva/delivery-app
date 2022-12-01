const express = require('express');
const cors = require('cors');
const login = require('../routes/login');
const register = require('../routes/register');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', login);
app.use('/register', register);

module.exports = app;
