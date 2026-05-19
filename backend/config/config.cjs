import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'db_whatsapp',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
};