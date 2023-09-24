'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'portfolios',
          key: 'id'
        }
      },
      shareId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'shares',
          key: 'id'
        }
      },
      action: {
        allowNull: false,
        type: Sequelize.ENUM('BUY', 'SELL')
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('trades');
  }
};