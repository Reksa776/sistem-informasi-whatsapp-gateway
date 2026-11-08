import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");

// Selalu baca backend/.env, walaupun proses dijalankan dari folder lain.
dotenv.config({ path: path.join(backendRoot, ".env") });

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const toBool = (value, fallback = false) => {
  if (value === undefined || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
};

const resolveFromBackend = (value, fallback) => {
  const target = value && value.trim() ? value.trim() : fallback;
  return path.isAbsolute(target) ? target : path.resolve(backendRoot, target);
};

const corsOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOrigin =
  corsOrigins.length === 0 || corsOrigins.includes("*") ? "*" : corsOrigins;

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toInt(process.env.PORT, 5000),

  database: {
    host: process.env.DB_HOST || "localhost",
    port: toInt(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "db_whatsapp",
    dialect: process.env.DB_DIALECT || "mysql",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },

  corsOrigin,
  corsOrigins,

  cookie: {
    secure: toBool(process.env.COOKIE_SECURE, false),
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAgeMs: toInt(process.env.COOKIE_MAX_AGE_MS, 24 * 60 * 60 * 1000),
  },

  whatsappSessionDir: resolveFromBackend(
    process.env.WHATSAPP_SESSION_DIR,
    "sessions"
  ),
  uploadDir: resolveFromBackend(process.env.UPLOAD_DIR, "uploads"),
  tempUploadDir: resolveFromBackend(process.env.TMP_UPLOAD_DIR, "tmp"),
};

if (!env.jwt.secret) {
  console.warn(
    "⚠️  JWT_SECRET belum diisi di backend/.env. Login dan verifikasi token tidak akan bekerja."
  );
}

export default env;
