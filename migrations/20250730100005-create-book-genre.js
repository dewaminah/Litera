'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      GenreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genres',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BookGenres');
  }
};