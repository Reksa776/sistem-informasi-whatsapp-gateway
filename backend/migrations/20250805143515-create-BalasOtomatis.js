'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('balas_otomatis', {
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          nama: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          perintah: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          balasan: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
