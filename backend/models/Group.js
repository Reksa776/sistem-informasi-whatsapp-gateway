import { DataTypes } from "sequelize";

const Group = (sequelize) => {
  const Group = sequelize.define("group", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: "kategori",
        key: "kategori",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
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
    tableName: "group",
    timestamps: true,
  });

  Group.associate = (models) => {
    Group.belongsTo(models.Kategori, { foreignKey: "kategori",onDelete: 'CASCADE', onUpdate: 'CASCADE', as: "nama_kategori" });
  };

  return Group;
};

export default Group;
