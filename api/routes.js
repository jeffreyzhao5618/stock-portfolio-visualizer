const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


const userRoutes = require('./routes/user.js');

app.use('/user', express.json());
app.use('/user', cookieParser());
app.use('/user', userRoutes);

module.exports = app;