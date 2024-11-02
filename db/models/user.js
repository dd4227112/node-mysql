'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/database');
let table_structure = require('../table_structures/user_table_structure');

// modify table structe const

table_structure.confirmPassword = {
  type: DataTypes.VIRTUAL,
  set(value) {
    if (value === this.password) {
      this.setDataValue('password', bcrypt.hashSync(value, 10))
    } else {
      throw new Error('Password do not match')
    }
  }
}
// create a model
module.exports = sequelize.define(
  'users',
  table_structure,
  {
    paranoid: true, // enable soft delete, make sure you have deletedAt column in the datable structure
    // freezeTableName: true, // disable setting table name to plurals
    modelName: 'users'
  }
)
