'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jadwal_pesan', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "kategori",
          key: "kategori",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pesan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      waktu: {
        type: Sequelize.TIME,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
