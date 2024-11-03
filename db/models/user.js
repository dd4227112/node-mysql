'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/database');
let table_structure = require('../table_structures/user_table_structure');
const appError = require('../../Utils/appError');
const projects = require('./projects');

// modify table structe const

table_structure.confirmPassword = {
  type: DataTypes.VIRTUAL,
  set(value) {
    if (value === this.password) {
      this.setDataValue('password', bcrypt.hashSync(value, 10))
    } else {
      throw new appError('Password do not match', 400)
    }
  }
}
// create a model
const users = sequelize.define(
  'users',
  table_structure,
  {
    paranoid: true, // enable soft delete, make sure you have deletedAt column in the datable structure
    // freezeTableName: true, // disable setting table name to plurals
    modelName: 'users',
    schema: 'public' // ooptional if schema is public
  }
);
// define relation btn user and project, ie one user can create many project and each project is created(belongs to) one user// we define both relationship in one model
users.hasMany(projects, { foreignKey: 'createdBy' }); // one user has  many project
projects.belongsTo(users, { foreignKey: 'createdBy' }); // each project belogs to one user
module.exports = users;
