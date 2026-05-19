import { DataTypes } from "sequelize";

const ListRole = (sequelize) => {
  const ListRole = sequelize.define("list_role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
    tableName: "list_role",
    timestamps: true,
  });

  // Kategori.associate = (models) => {
  //   Kategori.hasMany(models.Group, { foreignKey: "kategori", as: "group" });
  //   Kategori.hasMany(models.Kontak, { foreignKey: "kategori", as: "kontak" });
  //   Kategori.hasMany(models.JadwalPesan, { foreignKey: "kategori", as: "jadwalPesan" });
  // };

  return ListRole;
};

export default ListRole;
