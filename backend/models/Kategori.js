import { DataTypes } from "sequelize";

const Kategori = (sequelize) => {
  const Kategori = sequelize.define("kategori", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: "kategori",
    timestamps: true,
  });

  Kategori.associate = (models) => {
    Kategori.hasMany(models.Group, { foreignKey: "kategori", as: "group" });
    Kategori.hasMany(models.Kontak, { foreignKey: "kategori", as: "kontak" });
    Kategori.hasMany(models.JadwalPesan, { foreignKey: "kategori", as: "jadwalPesan" });
  };

  return Kategori;
};

export default Kategori;
