import express from "express";
import { loginAuth, loginStatus } from "../controllers/loginController.js";
import authMiddleware from "../middleware/auth.js"

const router = express.Router();
router.post("/login", loginAuth);
router.post("/protected", authMiddleware, loginStatus);

export default router;