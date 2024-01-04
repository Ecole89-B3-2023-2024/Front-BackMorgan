'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lien: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idAuthor: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      loginAuthor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Videos');
  }
};
