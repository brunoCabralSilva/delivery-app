const express = require('express');
const cors = require('cors');
const login = require('../routes/login');
const product = require('../routes/product');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/login', login);
app.use('/customer', product);

module.exports = app;
