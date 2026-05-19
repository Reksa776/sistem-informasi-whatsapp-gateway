import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./config/database.js";
import jadwalRoutes from "./routes/jadwalRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", jadwalRoutes);

(async () => {
    try {
        await database.authenticate();
        console.log("✅ Database Connected!");
        await database.sync();
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
    }
})();

export default app;
