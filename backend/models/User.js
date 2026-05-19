import { DataTypes } from "sequelize";

const User = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "name",
        key: "name",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
    tableName: "user",
    timestamps: true,
  });
  User.associate = (models) => {
    User.belongsTo(models.ListRole, {
      foreignKey: "role",   
      targetKey: "name",
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',     
      as: "roleDetail",     
    });
  };

  return User;
};

export default User;
