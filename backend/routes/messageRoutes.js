import express from "express";
import multer from "multer";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();
const upload = multer({ dest: "/tmp" });



// Kirim pesan
router.post("/sending", upload.single("file"), sendMessage);

export default router;

