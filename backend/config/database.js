import { Sequelize } from "sequelize";
import Kategori from "../models/Kategori.js";
import Kontak from "../models/Kontak.js";
import Group from "../models/Group.js";
import BalasOtomatis from "../models/BalasOtomatis.js";
import JadwalPesan from "../models/JadwalPesan.js";
import User from "../models/User.js";
import ListRole from "../models/ListRole.js";
import mysql2 from 'mysql2';
import env from "./env.js";

const database = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.pass,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: env.database.dialect,
    dialectModule: mysql2,
    logging: false, // Matikan logging jika tidak perlu
  }
);

const models = {
  Kategori: Kategori(database),
  Kontak: Kontak(database),
  Group: Group(database),
  BalasOtomatis: BalasOtomatis(database),
  JadwalPesan: JadwalPesan(database),
  User: User(database),
  ListRole: ListRole(database)
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Sinkronisasi database
database.sync().then(() => {
  console.log("Database berhasil tersinkronisasi");
}).catch((err) => {
  console.error("Gagal sinkronisasi database:", err);
});

  export { models };
  export default database;


