'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('meet_greets', 'meet_start_time', {
      type: DataTypes.TIME
    });
    await queryInterface.addColumn('meet_greets', 'meet_end_time', {
      type: DataTypes.TIME
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('meet_greets', 'meet_start_time');
    await queryInterface.removeColumn('meet_greets', 'meet_end_time');
  }
};
