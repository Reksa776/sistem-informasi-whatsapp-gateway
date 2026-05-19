import express from "express";
import { getBalasOtomatis, createBalasOtomatis, updateBalasOtomatis, deleteBalasOtomatis } from "../controllers/balasOtomatisController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware, getBalasOtomatis);
router.post("/", authMiddleware, createBalasOtomatis);
router.put("/:id", authMiddleware, updateBalasOtomatis);
router.delete("/:id", authMiddleware, deleteBalasOtomatis);

export default router;
