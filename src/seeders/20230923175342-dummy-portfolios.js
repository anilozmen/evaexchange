'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('portfolios', [
      {
        name: 'John\'s Portfolio',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane\'s Portfolio',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Joseph\'s Portfolio',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jonathon\'s Portfolio',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('portfolios', null, {});
  }
};
