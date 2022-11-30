const express = require('express');
const login = require('../routes/login');

const app = express();

app.use(express.json());

app.use('/login', login);

module.exports = app;
// commit


