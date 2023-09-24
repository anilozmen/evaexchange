'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('trades', [
      {
        portfolioId: 1,
        shareId: 1,
        action: 'BUY',
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        portfolioId: 1,
        shareId: 2,
        action: 'BUY',
        quantity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        portfolioId: 1,
        shareId: 2,
        action: 'SELL',
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        portfolioId: 2,
        shareId: 3,
        action: 'BUY',
        quantity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        portfolioId: 2,
        shareId: 1,
        action: 'BUY',
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        portfolioId: 2,
        shareId: 1,
        action: 'SELL',
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('trades', null, {});
  }
};
