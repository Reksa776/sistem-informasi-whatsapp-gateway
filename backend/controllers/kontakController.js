import {models} from "../config/database.js";

export const getKontak = async (req, res) => {
    try {
      const kontak = await models.Kontak.findAll({
        include: [
          {
            model: models.Kategori,
            as: "nama_kategori", // Harus sesuai dengan alias yang kita buat di database.js
            attributes: ["id", "kategori"], // Ambil hanya atribut yang diperlukan
          },
        ],
      });
  
      return res.status(200).json(kontak);
    } catch (error) {
      console.error("❌ Error mengambil kontak:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

export const createKontak = async (req, res) => {
  const { kategori, name, email, nomor } = req.body;
  await models.Kontak.create({ kategori, name, email, nomor });
  console.log(req.body)
  res.json(req.body);
};

export const updateKontak = async (req, res) => {
  const { id } = req.params;
  const { kategori, name, email, nomor } = req.body;
  await models.Kontak.update({ kategori, name, email, nomor }, { where: { id } });
  res.json({ message: "Kontak berhasil diperbarui" });
};

export const deleteKontak = async (req, res) => {
  const { id } = req.params;
  await models.Kontak.destroy({ where: { id } });
  res.json({ message: "Kontak berhasil dihapus" });
};
