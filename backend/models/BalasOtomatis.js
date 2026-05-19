import { DataTypes } from "sequelize";

const BalasOtomatis = (sequelize) => {
  return sequelize.define("BalasOtomatis", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perintah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balasan: {
      type: DataTypes.TEXT,
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
    tableName: "balas_otomatis",
    timestamps: true,
  });
};

export default BalasOtomatis;
