import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import handleMessage from "./balasOtomatisService.js";
import qrcodes from "qrcode";
import qrcode from "qrcode-terminal";
import messageService from "./messageService.js";
import { Boom } from '@hapi/boom';
import readline from 'readline';
import path from 'path';

let sock;
let dataQR = null;
let user = null

const startWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("/tmp/sessions");

  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("messages.upsert", async (m) => {
    const message = m.messages[0];
    if (!message.key.fromMe) {
      handleMessage(sock, message);
      console.log("Pesan masuk:", message.message?.conversation);
      // console.log("Pesan masuk:", message.key.remoteJid);
    }
    for (const msg of m.messages) {
      if (!msg.message) continue;

      let text = "";
      let type = "text";

      if (msg.message.conversation) {
        text = msg.message.conversation;
      } else if (msg.message.extendedTextMessage?.text) {
        text = msg.message.extendedTextMessage.text;
      } else {
        text = "[non-text message]";
      }

      if (msg.key.remoteJid.endsWith("@g.us")) {
        return;
      }
      if (msg.key.remoteJid.endsWith("@newsletter")) {
        return;
      }
      if (msg.key.remoteJid === "status@broadcast") {
        return;

      }
      io?.emit("message", {
        id: msg.key.id,
        from: msg.key.remoteJid,
        text,
        type,
        timestamp: new Date(),
        isSelf: msg.key.fromMe,
      });


      messageService.addMessage({
        id: msg.key.id,
        from: msg.key.remoteJid,
        text,
        type,
        timestamp: new Date(),
        isSelf: msg.key.fromMe,
      });
    }
  });
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // ✅ Menangani QR code secara manual
    if (qr) {
      dataQR = await qrcodes.toDataURL(qr);
      user = null
      console.log('📱 Silakan scan QR code berikut:');
      qrcode.generate(qr, { small: true }); // Tampilkan QR ke terminal
    }

    // if (connection === 'close') {
    //   const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
    //   console.log('Connection closed. Reconnecting...', shouldReconnect);

    //   if (shouldReconnect) {
    //     startWhatsApp();
    //   } else {
    //     console.log('❌ Kamu telah logout.');
    //     fs.rmSync("sessions", { recursive: true, force: true });
    //     startWhatsApp();
    //   }
    // }
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      console.log('Connection closed. Reason:', reason);
    
      if (reason === DisconnectReason.loggedOut) {
        console.log('❌ Kamu telah logout dari perangkat.');
        fs.rmSync("/tmp/sessions", { recursive: true, force: true });
    
        // 🔄 Re-run untuk munculkan QR baru setelah logout
        console.log('📱 Silakan scan ulang QR untuk login kembali...');
        setTimeout(() => startWhatsApp(), 3000); // delay 3 detik agar tidak looping
      } else {
        console.log('🔁 Koneksi terputus, mencoba menyambung kembali...');
        startWhatsApp();
      }
    }
    

    if (connection === 'open' || connection === 'connected') {
      dataQR = null
      user = {
        id: sock.user.id, // format: 628xx@s.whatsapp.net
        number: sock.user.id.split(":")[0], // ambil hanya nomor
        name: sock.userAgent || null, // push name dari WA
      }
      console.log('✅ WhatsApp berhasil terhubung!');
      await sock.sendPresenceUpdate("available");
    }




  });
  sock.ev.on("messaging-history.set", async () => {
    console.log("✅ Sinkronisasi histori selesai");
    await sock.sendPresenceUpdate("available");
  });
  sock.ev.on('contacts.upsert', (contacts) => {
    console.log('Kontak terdeteksi:', contacts.length);
    console.log('Kontak terdeteksi:', contacts);
  });
  sock.ev.on('messages.set', async () => {
    console.log('📦 Pesan sinkron selesai');
  });
};
export async function getQRDataUrl() {
  if (status.connected)
    return {
      connected: true,
      qrDataUrl: null,
      pushName: status.pushName,
    };
  if (!status.qr) return { connected: false, qrDataUrl: null };
  const qrDataUrl = await qrcode.toDataURL(status.qr);
  return { connected: false, qrDataUrl };
}

export async function sendMessage(to, message) {
  if (!to || !message) throw new Error("Missing to or message");
  const jid = to.includes("@") ? to : `${to}@s.whatsapp.net`;
  if (!sock) throw new Error("WhatsApp not connected");

  // kirim pesan
  const result = await sock.sendMessage(jid, { text: message });

  // ❌ Jangan insert manual ke messageService
  // messageService.addMessage(...);

  return result;
}
// whatsappService.js
let io = null; // socket.io instance

export function setIO(socketIO) {
  io = socketIO;
}


export { sock, dataQR, user };

export default startWhatsApp;

