const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const errorController = require('./Controllers/errorController');
const appError = require('./Utils/appError');
app.use(express.json());
const prefix = process.env.PREFIX

app.use(prefix + '/auth', authRoutes);
app.use(prefix + '/project', projectRoutes);

app.use('*', (req, res, next) => {
    return next(new appError(`Cant find ${req.originalUrl} on the server`, 404));
})
app.use(errorController);

module.exports = app 