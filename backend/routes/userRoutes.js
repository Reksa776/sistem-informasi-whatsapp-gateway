import express from "express";
import multer from "multer";
import path from "path";
import { getUser, resetUserPassword, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import authMiddleware from '../middleware/auth.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage });

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/", authMiddleware, upload.single("image"), createUser);
router.post("/reset:id", authMiddleware, resetUserPassword);
router.put("/:id", authMiddleware, upload.single("image"),  updateUser);
router.delete("/:id", authMiddleware, deleteUser);
export default router;