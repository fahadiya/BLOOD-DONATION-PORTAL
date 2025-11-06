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

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes

app.use("/api/donors", donorRoutes);
app.use("/api/receivers", receiverRoutes);
app.use("/api/hospitals", hospitalRoutes);

// ✅ Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Root Endpoint
app.get("/", (req, res) => {
    res.send("🚀 Blood Donation Portal Backend is Running...");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
