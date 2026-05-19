import { DataTypes } from "sequelize";

const Kontak = (sequelize) => {
  const Kontak = sequelize.define("kontak", {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nomor: {
      type: DataTypes.STRING,
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
    tableName: "kontak",
    timestamps: true,
  });

  Kontak.associate = (models) => {
    Kontak.belongsTo(models.Kategori, { foreignKey: "kategori",onDelete: 'CASCADE', onUpdate: 'CASCADE', as: "nama_kategori" });
  };

  return Kontak;
};

export default Kontak;
