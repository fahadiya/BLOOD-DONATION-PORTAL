// backend/models/Receiver.js
import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    bloodGroup: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    unitsRequired: { type: Number, required: true },
    urgency: { type: String },
    reason: { type: String },
    hospitalName: { type: String, required: true },
    hospitalAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
});

const Receiver = mongoose.model("Receiver", receiverSchema);
export default Receiver;
