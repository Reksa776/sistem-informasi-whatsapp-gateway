'use strict';
import bcrypt from 'bcrypt';


/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('user', [{
      image: 'admin.png',
      role: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin', 10),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
