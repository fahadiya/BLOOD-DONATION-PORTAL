import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import donorRoutes from "./routes/donorRoutes.js";
import receiverRoutes from "./routes/receiverRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Correct route mount
app.use("/api/donors", donorRoutes);
app.use("/api/receivers", receiverRoutes);
app.use("/api/hospitals", hospitalRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
