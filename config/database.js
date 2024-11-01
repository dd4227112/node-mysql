// create database connection using sequelize

const { Sequelize } = require('sequelize');
const config = require('./config');
const environment = process.env.APP_ENVIRONMENT || development;

const sequelize = new Sequelize(config[environment]); // create a connection from the configuration file object based on app environment

module.exports = sequelize;


