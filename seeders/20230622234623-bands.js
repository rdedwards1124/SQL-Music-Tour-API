'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('bands', [
    {
      name: 'Twisted Brother in Law',
      genre: 'Folk Music',
      available_start_time: '12:00',
      end_time: '13:00'
    },
    {
      name: 'Fizzo',
      genre: 'Pop',
      available_start_time: '16:00',
      end_time: '18:00'
    },
    {
      name: 'AC/Fan',
      genre: 'Pop-Rock',
      available_start_time: '19:00',
      end_time: '23:00'
    },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('bands', null, {});
  }
};
