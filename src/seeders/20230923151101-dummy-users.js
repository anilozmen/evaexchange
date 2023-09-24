'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        balance: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@doe.com",
        balance: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Joseph",
        lastName: "Doe",
        email: "joseph@doe.com",
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jonathon",
        lastName: "Doe",
        email: "jonathon@doe.com",
        balance: 350,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jerry",
        lastName: "Doe",
        email: "jerry@doe.com",
        balance: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
