
const config = require('./config'); // include config file

const { Sequelize } = require('sequelize'); // call Sequelize class

const environment = process.env.APP_ENVIRONMENT || 'development'; //get app environment or set default value as delevopment

// create a database connection
const sequelize = new Sequelize(config[environment]); // create a connection from the configuration file object based on app environment

module.exports = sequelize; // export modules sequelize


