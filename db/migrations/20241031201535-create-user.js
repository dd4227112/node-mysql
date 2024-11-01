'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
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
        defaultValue: Date.now()
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};