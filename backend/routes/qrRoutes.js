import express from "express";
import {dataQR, user }from "../services/whatsappService.js";

const router = express.Router();
router.get("/", (req, res)=>{
    res.json({qr: dataQR, user: user});
});

export default router;