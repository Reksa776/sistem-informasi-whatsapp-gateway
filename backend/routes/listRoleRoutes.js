import express from "express";
import { getListRole } from "../controllers/listRoleController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware,  getListRole);


export default router;
