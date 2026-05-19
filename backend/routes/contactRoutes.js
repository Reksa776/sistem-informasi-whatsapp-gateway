import express from "express";
import { getContacts, markAsRead } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/read", markAsRead);

export default router;
