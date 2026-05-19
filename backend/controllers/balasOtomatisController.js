import {models} from "../config/database.js";

export const getBalasOtomatis = async (req, res) => {
  const responses = await models.BalasOtomatis.findAll();
  res.json(responses);
};

export const createBalasOtomatis = async (req, res) => {
  const { nama, perintah, balasan } = req.body;
  await models.BalasOtomatis.create({ nama, perintah, balasan });
  res.json({ message: "Balasan otomatis berhasil ditambahkan" });
};

export const updateBalasOtomatis = async (req, res) => {
  const { id } = req.params;
  const { nama, perintah, balasan } = req.body;
  await models.BalasOtomatis.update({ nama, perintah, balasan }, { where: { id } });
  res.json({ message: "Balasan otomatis berhasil diperbarui" });
};

export const deleteBalasOtomatis = async (req, res) => {
  const { id } = req.params;
  await models.BalasOtomatis.destroy({ where: { id } });
  res.json({ message: "Balasan otomatis berhasil dihapus" });
};
