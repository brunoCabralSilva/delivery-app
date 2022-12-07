const express = require('express');
const cors = require('cors');
const login = require('../routes/login');
const register = require('../routes/register');
const customer = require('../routes/customer');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/login', login);

app.use('/register', register);

app.use('/customer', customer);

module.exports = app;
