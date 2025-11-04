import express from "express";
import Receiver from "../models/Receiver.js";

const router = express.Router();

// POST - Add a new receiver
router.post("/", async (req, res) => {
    try {
        const newReceiver = new Receiver(req.body);
        await newReceiver.save();
        res.status(201).json({ message: "✅ Receiver data stored successfully!" });
    } catch (error) {
        console.error("❌ Error saving receiver:", error);
        res.status(500).json({ message: "Failed to store data", error });
    }
});

// (Optional) GET - Fetch all receivers
router.get("/", async (req, res) => {
    try {
        const receivers = await Receiver.find();
        res.status(200).json(receivers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching receivers", error });
    }
});

export default router;
