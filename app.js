const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const { status } = require('express/lib/response');
const errorController = require('./Controllers/errorController');
const appError = require('./Utils/appError');
app.use(express.json());

const prefix = process.env.PREFIX

app.use(prefix + '/auth', authRoutes);

app.use('*', (req, res, next) => {
    return next(new appError(`Cant find ${req.originalUrl} on the server`, 400));
})
app.use(errorController);

module.exports = app 