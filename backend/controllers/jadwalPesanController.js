import { models } from "../config/database.js";

export const getJadwalPesan = async (req, res) => {
  try {
    const jadwalPesan = await models.JadwalPesan.findAll({
      include: [
        {
          model: models.Kategori,
          as: "kategori_jadwal", // Harus sesuai dengan alias yang kita buat di database.js
          attributes: ["id", "kategori"], // Ambil hanya atribut yang diperlukan
        },
      ],
    });

    return res.status(200).json(jadwalPesan);
  } catch (error) {
    console.error("❌ Error mengambil jadwal pesan:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createJadwalPesan = async (req, res) => {
  const { kategori, tanggal , pesan, waktu } = req.body;
  await models.JadwalPesan.create({ kategori, tanggal , pesan, waktu });
  res.json({ message: "Jadwal pesan berhasil ditambahkan" });
};

export const updateJadwalPesan = async (req, res) => {
  const { id } = req.params;
  const { kategori, pesan, waktu } = req.body;
  await models.JadwalPesan.update({ kategori, pesan, waktu }, { where: { id } });
  res.json({ message: "Jadwal pesan berhasil diperbarui" });
};

export const deleteJadwalPesan = async (req, res) => {
  const { id } = req.params;
  await models.JadwalPesan.destroy({ where: { id } });
  res.json({ message: "Jadwal pesan berhasil dihapus" });
};
