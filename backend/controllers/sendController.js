import { sendMessage } from "../services/whatsappService.js";

export async function sendMessageController(req, res) {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: "Missing to or message" });
    }

    await sendMessage(to, message);
    res.json({ success: true });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
}
