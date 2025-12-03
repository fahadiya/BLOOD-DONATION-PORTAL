import Donor from "../models/Donor.js";
import Receiver from "../models/Receiver.js";

export const getAllDonors = async (req, res) => {
    const donors = await Donor.find();
    res.json(donors);
};

export const getAllReceivers = async (req, res) => {
    const receivers = await Receiver.find();
    res.json(receivers);
};

export const deleteDonor = async (req, res) => {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor removed" });
};

export const deleteReceiver = async (req, res) => {
    await Receiver.findByIdAndDelete(req.params.id);
    res.json({ message: "Receiver removed" });
};

// ✅ New controller to toggle donor availability
export const toggleDonorAvailability = async (req, res) => {
    const donor = await Donor.findById(req.params.id);
    donor.availability = !donor.availability;
    await donor.save();
    res.json({ message: "Availability updated", donor });
};
