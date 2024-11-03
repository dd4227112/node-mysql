'use strict';
const project_table = require('../table_structures/project_table_structure');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects',
      project_table,
      { schema: 'public' } // use if the schema is not public otherwise will use default schema(public);
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects', { schema: 'public' });
  }
};