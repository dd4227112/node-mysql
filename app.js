const express = require('express');
const app = express();
const indexRoutes = require('./Routes/authRoutes');

const prefix = process.env.PREFIX

app.use(prefix + '/auth', indexRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Path url not found'
    })
})

module.exports = app 