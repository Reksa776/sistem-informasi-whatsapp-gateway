import { DataTypes } from "sequelize";

const JadwalPesan = (sequelize) => {
  const JadwalPesan = sequelize.define("jadwal_pesan", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "kategori",
        key: "kategori",
      },
    },
    pesan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waktu: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: "jadwal_pesan",
    timestamps: true,
  });

  JadwalPesan.associate = (models) => {
    JadwalPesan.belongsTo(models.Kategori, { foreignKey: "kategori",onDelete: 'CASCADE', onUpdate: 'CASCADE',  as: "kategori_jadwal" });
  };

  return JadwalPesan;
};

export default JadwalPesan;
