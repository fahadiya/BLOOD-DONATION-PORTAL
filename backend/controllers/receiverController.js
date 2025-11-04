// backend/controllers/receiverController.js
import Receiver from "../model/Receiver.js";

export const createReceiver = async (req, res) => {
    try {
        const receiver = new Receiver(req.body);
        await receiver.save();
        res.status(201).json({ message: "Receiver added successfully", receiver });
    } catch (error) {
        console.error("Error saving receiver:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getReceivers = async (req, res) => {
    try {
        const receivers = await Receiver.find();
        res.status(200).json(receivers);
    } catch (error) {
        console.error("Error fetching receivers:", error);
        res.status(500).json({ message: "Server error" });
    }
};
