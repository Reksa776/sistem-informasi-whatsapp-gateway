import { models } from "../config/database.js";
import bcrypt from 'bcrypt';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, join }  from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getUser = async (req, res) => {
    try {
        const user = await models.User.findAll();
        return res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error mengambil data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }

};

export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const image = req.file ? req.file.filename : null;

        const existing = await models.User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ error: 'User sudah terdaftar' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await models.User.create({ image, role: "member", email, password: hashedPassword });

        return res.json({ message: 'Register sukses' });
    } catch (error) {
        console.error("❌ Error membuat data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }

};


export const updateUser = async (req, res) => {
    try {
        const { email } = req.body
        const image = req.file ? req.file.filename : false;
        const { id } = req.params;
        if (image) {
            await models.User.update({ image, email},{ where: { id } });
        }else{
            await models.User.update({ email },{ where: { id } });
        }


        return res.json({ message: 'perbarui sukses' });
    } catch (error) {
        console.error("❌ Error perbarui data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const resetUserPassword = async (req, res) => {
    try {
        const { password } = req.body
        const { id } = req.params;
        console.log(password);
        

        const hashedPassword = await bcrypt.hash(password, 10);
        await models.User.update({password: hashedPassword },{ where: { id } });

        return res.json({ message: 'perbarui sukses' });
    } catch (error) {
        console.error("❌ Error perbarui data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await models.User.findByPk(id);
        if (user.image) {
            const imagePath = path.join(__dirname, "../uploads", user.image);
            fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
          }
        await models.User.destroy({ where: { id } });
    } catch (error) {
        console.error("❌ Error menghapus data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};