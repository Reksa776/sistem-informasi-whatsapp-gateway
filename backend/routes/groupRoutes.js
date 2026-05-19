import express from "express";
import { getGroup, createGroup, updateGroup, deleteGroup } from "../controllers/groupController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware, getGroup);
router.post("/", authMiddleware, createGroup);
router.put("/:id", authMiddleware, updateGroup);
router.delete("/:id", authMiddleware, deleteGroup);

export default router;
