import express from "express";
import cors from "cors";
import { parse } from "url";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import database from "./config/database.js";
import kategoriRoutes from "./routes/kategoriRoutes.js";
import kontakRoutes from "./routes/kontakRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import balasOtomatisRoutes from "./routes/balasOtomatisRoutes.js";
import jadwalPesanRoutes from "./routes/jadwalPesanRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import listRoleRoutes from "./routes/listRoleRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import startWhatsApp, { setIO } from "./services/whatsappService.js";
import "./services/jadwalService.js";
import { createServer } from "http";
import { Server } from "socket.io";
import messagesRoutes from "./routes/messagesRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import sendRoutes from "./routes/sendRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/kategori", kategoriRoutes);
app.use("/kontak", kontakRoutes);
app.use("/group", groupRoutes);
app.use("/balas-otomatis", balasOtomatisRoutes);
app.use("/jadwal-pesan", jadwalPesanRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/listrole", listRoleRoutes);
app.use("/qr", qrRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/send", sendRoutes);
app.use("/api", messageRoutes);

// kontak API
app.use("/api", kontakRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000", // ganti kalau frontend beda port
    methods: ["GET", "POST"],
  },
});
setIO(io);


database.sync()
  .then(() => {
    console.log("Database connected!");
    startWhatsApp();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Database connection error:", err));


io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  app(req, res);
}




