import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const JWT_SECRET = env.jwt.secret;

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token tidak valid' });
  }
};

export default authMiddleware;
