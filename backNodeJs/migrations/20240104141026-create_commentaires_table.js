'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Commentaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contenu: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idVideo: {
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable('Commentaires');
  }
};
