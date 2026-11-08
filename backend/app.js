import express from "express";
import cors from "cors";
import env from "./config/env.js";
import database from "./config/database.js";
import jadwalRoutes from "./routes/jadwalPesanRoutes.js";

const app = express();

app.use(cors({ origin: env.corsOrigin }));
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
