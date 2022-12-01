const express = require('express');
const cors = require('cors');
const login = require('../routes/login');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', login);

module.exports = app;
