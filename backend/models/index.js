import { Sequelize } from "sequelize";
import database from "../config/database.js";
import Kategori from "./Kategori.js";
import Kontak from "./Kontak.js";
import Group from "./Group.js";
import BalasOtomatis from "./BalasOtomatis.js";
import JadwalPesan from "./JadwalPesan.js";
import ListRole from "./ListRole.js";

const models = { ListRole, Kategori, Kontak, Group, BalasOtomatis, JadwalPesan };

Object.values(models).forEach((model) => {
  model.init(database);
  model.sync();
});

export default models;
