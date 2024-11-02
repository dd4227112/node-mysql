'use strict';
/** @type {import('sequelize-cli').Migration} */
const table_structure = require('../table_structures/user_table_structure');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', table_structure);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
module.exports