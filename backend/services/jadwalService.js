import { models } from "../config/database.js";
import  {sock}  from "./whatsappService.js";
import cron from "node-cron";


// Fungsi mengirim pesan
const kirimPesan = async () => {
  try {
    const now = new Date();
    const tanggal = now.toISOString().split("T")[0]; // Format YYYY-MM-DD
    const waktu = now.toTimeString().split(" ")[0].slice(0, 5); // Format HH:mm

    // Ambil jadwal sesuai waktu
    const jadwal = await models.JadwalPesan.findAll({ where: { tanggal, waktu } });
    const {id} = jadwal;

    for (const item of jadwal) {
      const kontakList = await models.Kontak.findAll({ where: { kategori: item.kategori } });
      const groupList = await models.Group.findAll({ where: { kategori: item.kategori } });

      for (const kontak of kontakList) {
        await sock.sendMessage(kontak.nomor + "@s.whatsapp.net", { text: item.pesan });
      }
      for (const group of groupList) {
        await sock.sendMessage(group.group_id, { text: item.pesan });
        console.log(`📩 Pesan terkirim ke ${kontak.nomor}: ${item.pesan}`);
      }
    }
    // await models.JadwalPesan.destroy({ where: { id } });
  } catch (error) {
    console.error("❌ Gagal mengirim pesan:", error);
  }
};

// Jalankan cronjob setiap menit
cron.schedule("* * * * *", kirimPesan);
