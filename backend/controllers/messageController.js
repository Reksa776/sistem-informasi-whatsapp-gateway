import messageService from "../services/messageService.js";
import { models } from "../config/database.js";
import { sock } from "../services/whatsappService.js";
import fs from "fs";

export const getMessages = async (req, res) => {
  const msg = messageService.getMessages()[0];
  // const kontak = await models.Kontak.findAll({ where: { nomor: messageService.getMessages(). } });
  res.json({
    // name: ,
    // messages: {
      messages: messageService.getMessages()
    // }
  });
  // res.json({
  //     messages: {
  //           "id": msg.id,
  //           "from": msg.from,
  //           "text": msg.text,
  //           "type": msg.type,
  //           "timestamp": msg.timestamp,
  //           "isSelf": msg.isSelf
  //       }
  //   // }
  // });
};

export const addMessage = (req, res) => {
  const msg = req.body;
  messageService.addMessage(msg);
  res.json({ success: true });
};

export const sendMessage = async (req, res) => {
  try {
    const { nomor, type, message } = req.body;
    const filePath = req.file ? req.file.path : null; // ✅ path dari multer
    let options = {};

    if (type === "text") {
      options = { text: message };
    } else if (type === "document" && filePath) {
      options = {
        document: fs.readFileSync(filePath),
        fileName: req.file.originalname,
        mimetype: req.file.mimetype,
        caption: message || ""   // ✅ tambahkan caption
      };
    } else if (type === "image" && filePath) {
      options = {
        image: fs.readFileSync(filePath),
        caption: message || ""   // ✅ sudah ada
      };
    } else if (type === "video" && filePath) {
      options = {
        video: fs.readFileSync(filePath),
        caption: message || ""   // ✅ sudah ada
      };
    }

    // ✅ kirim pesan
    await sock.sendMessage(nomor + "@s.whatsapp.net", options);

    // ✅ hapus file kalau ada
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Gagal hapus file:", err);
        else console.log("File berhasil dihapus:", filePath);
      });
    }

    res.json({ success: true, message: "Pesan terkirim!" });

  } catch (error) {
    console.error("❌ Error kirim pesan:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};