import Hospital from "../models/HospitalStock.js";

export const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hospitals", error });
    }
};

export const addHospital = async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        await newHospital.save();
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(500).json({ message: "Error adding hospital", error });
    }
};

export const deleteHospital = async (req, res) => {
    try {
        await Hospital.findByIdAndDelete(req.params.id);
        res.json({ message: "Hospital deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hospital", error });
    }
};
