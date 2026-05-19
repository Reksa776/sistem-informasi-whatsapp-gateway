import { models } from "../config/database.js";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function handleMessage(sock, m) {
    if (!m || !m.key || !m.key.remoteJid) {
        console.log("Pesan tidak valid atau bukan dari pengguna.");
        return;
    }

    const sender = m.key.remoteJid;
    const pesan = m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        m.message?.imageMessage?.caption ||
        "";

    console.log(`Pesan dari: ${sender}, Isi: ${pesan}`);
    const isGroup = sender.endsWith("@g.us");

    if (isGroup) {
        console.log(`Pesan dari grup: ${sender}`);
    } else {
        const balasan = await models.BalasOtomatis.findOne({ where: { perintah: pesan } });


        if (balasan) {
            await sock.sendPresenceUpdate("composing", sender);
            await delay(2500);
                // await sock.sendMessage(sender, { text: balasan.balasan });
                await sock.sendMessage(sender, {
                    text: balasan.balasan,
                    quoted: m
                  });
        }
    }
    // Cek jika ada balasan otomatis

}

export default handleMessage;
