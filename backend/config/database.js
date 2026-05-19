import { Sequelize } from "sequelize";
import Kategori from "../models/Kategori.js";
import Kontak from "../models/Kontak.js";
import Group from "../models/Group.js";
import BalasOtomatis from "../models/BalasOtomatis.js";
import JadwalPesan from "../models/JadwalPesan.js";
import User from "../models/User.js";
import ListRole from "../models/ListRole.js";
import fs from 'fs';
import mysql2 from 'mysql2';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database = new Sequelize("your DB", "your user", "your Password", {
  host: "your host",
  port: 3306,
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false, // Matikan logging jika tidak perlu
});
// const database = new Sequelize("db_whatsapp", "root", "", {
//   host: "127.0.0.1",
//   port: 3306,
//   dialect: "mysql",
//   // dialectOptions: {
//   //   ssl: {
//   //     ca: fs.readFileSync(path.join(__dirname, "../SSL/ca.pem")).toString(),
//   //   }
//   // },
//   logging: false, // Matikan logging jika tidak perlu
// });

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


