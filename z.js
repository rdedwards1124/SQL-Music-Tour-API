//////////////////////////////////
//      IGNORE THIS FILE!!!     //
//////////////////////////////////


'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('set_times', 'band_id', {
      type: DataTypes.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('set_times', 'band_id');
  }
};