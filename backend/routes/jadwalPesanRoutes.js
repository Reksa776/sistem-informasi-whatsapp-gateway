import express from "express";
import { getJadwalPesan, createJadwalPesan, updateJadwalPesan, deleteJadwalPesan } from "../controllers/jadwalPesanController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware, getJadwalPesan);
router.post("/", authMiddleware, createJadwalPesan);
router.put("/:id", authMiddleware, updateJadwalPesan);
router.delete("/:id", authMiddleware, deleteJadwalPesan);

export default router;
