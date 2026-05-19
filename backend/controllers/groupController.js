import { models } from "../config/database.js";
import { sock } from "../services/whatsappService.js";


export const getGroup = async (req, res) => {
  const groups = await models.Group.findAll({
    include: [
      {
        model: models.Kategori,
        as: "nama_kategori",
        attributes: ["id", "kategori"], // Hanya ambil nama kategori
      },
    ],
  });
  res.json(groups);
};

export const createGroup = async (req, res) => {
  try {
    const { kategori, name } = req.body;
    const groups = await sock.groupFetchAllParticipating();
    const group = Object.values(groups).find((g) => g.subject === name);
    const group_id = group.id;
    await models.Group.create({ kategori, name, group_id });
    res.json({ message: "Grup berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategori, name } = req.body;
    const groups = await sock.groupFetchAllParticipating();
    const group = Object.values(groups).find((g) => g.subject === name);
    const group_id = group.id;
    await models.Group.update({ kategori, name, group_id }, { where: { id } });
    res.json({ message: "Grup berhasil diperbarui" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  await models.Group.destroy({ where: { id } });
  res.json({ message: "Grup berhasil dihapus" });
};
