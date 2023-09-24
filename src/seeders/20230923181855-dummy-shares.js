'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('shares', [
      {
        name: 'ABC',
        rate: 12.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BAC',
        rate: 20.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CAB',
        rate: 41.10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('shares', null, {});
  }
};
