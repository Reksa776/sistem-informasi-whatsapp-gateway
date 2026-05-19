import { models} from "../config/database.js";

export const getKategori = async (req, res) => {
    try {
      const kategori = await models.Kategori.findAll(); // Gunakan models.Kategori
      return res.status(200).json(kategori);
    } catch (error) {
      console.error("❌ Error mengambil kategori:", error);
      return res.status(500).json({ success: false, message: "Gagal mengambil kategori" });
    }
  };

export const createKategori = async (req, res) => {
    try {

        // Gunakan models.Kategori
        const kategori = await models.Kategori.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Kategori berhasil ditambahkan",
            data: kategori,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateKategori = async (req, res) => {
    try {
        
        const { id } = req.params;
        await models.Kategori.update(req.body, { where: { id } });
        res.json({ message: "Kategori berhasil diperbarui" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteKategori = async (req, res) => {
    try {
        const { id } = req.params;
        await models.Kategori.destroy({ where: { id } });
        res.json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
};
