require('dotenv').config({ path: `.env` });
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.localhost,
    "dialect": process.env.DB_DRIVER
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.localhost,
    "dialect": process.env.DB_DRIVER
  }
}
