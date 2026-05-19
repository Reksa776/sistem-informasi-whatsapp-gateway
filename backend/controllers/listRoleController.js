import { models } from "../config/database.js";

export const getListRole = async (req, res) => {
    try {
        const ListRole = await models.ListRole.findAll(); // Gunakan models.Kategori
        return res.status(200).json(ListRole);
    } catch (error) {
        console.error("❌ Error mengambil kategori:", error);
        return res.status(500).json({ success: false, message: "Gagal mengambil kategori" });
    }
};