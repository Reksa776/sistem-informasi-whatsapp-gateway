import express from "express";
import { getKontak, createKontak, updateKontak, deleteKontak } from "../controllers/kontakController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", getKontak);
router.post("/", authMiddleware, createKontak);
router.put("/:id", authMiddleware, updateKontak);
router.delete("/:id", authMiddleware, deleteKontak);

export default router;
