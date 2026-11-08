import express from "express";
import multer from "multer";
import fs from "fs";
import { sendMessage } from "../controllers/messageController.js";
import env from "../config/env.js";

fs.mkdirSync(env.tempUploadDir, { recursive: true });

const router = express.Router();
const upload = multer({ dest: env.tempUploadDir });



// Kirim pesan
router.post("/sending", upload.single("file"), sendMessage);

export default router;

