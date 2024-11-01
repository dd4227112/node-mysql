'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
module.exports = sequelize.define(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstName: {
      type: Sequelize.STRING
    },

    lastName: {
      type: Sequelize.STRING
    },

    userType: {
      type: Sequelize.ENUM
    },

    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE,
    }

  },
  {
    paranoid: true, // enable soft delete
    freezeTableName: true, // disable setting table name to plurals
    modelName: 'user'
  }
)
