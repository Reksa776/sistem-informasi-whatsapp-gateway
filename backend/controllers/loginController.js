import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { models } from "../config/database.js";

export const loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({ msg: "Email dan password wajib diisi", email: email, password: password });
        }

        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ msg: "Email tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(isMatch);

            return res.status(401).json({ msg: "Password salah" });
        }
        const expiresIn = 60 * 60 * 24; 

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.image
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresIn
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true jika HTTPS
            sameSite: 'Lax',
            maxAge: 3600000
        });
        return res.status(201).json({ payload,token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

};

export const loginStatus = (req, res) => {

    res.status(201).json({ status: 'Token Valid', authenticated: true });
};